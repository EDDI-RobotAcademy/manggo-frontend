"use client";

import { useMemo, useState } from "react";
import { useEffect, useRef } from "react";
import { RecentlyViewedItem } from "./NewsDetail";
import { useRouter } from "next/navigation";

type WeatherPoint = {
  time: string;
  temp: number | null;
  feels_like: number | null;
  humidity: number | null;
  weather?: string | null;
  wind_speed: number | null;
};

export default function RecentViews() {
  const [loading, setLoading] = useState(false);
  const [ttsLoading, setTtsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [dataPoints, setDataPoints] = useState<WeatherPoint[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const router = useRouter();

  const todaySeoul = useMemo(
    () =>
      new Date().toLocaleDateString("sv-SE", {
        timeZone: "Asia/Seoul",
      }),
    []
  );

  const [recentlyViewedNews, setRecentlyViewedNews] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedNews = localStorage.getItem("recentlyViewedNews");
      console.log(storedNews);
      if (storedNews) {
        try {
          setRecentlyViewedNews(JSON.parse(storedNews));
        } catch (e) {
          console.error("Failed to parse recentlyViewedNews from localStorage", e);
          setRecentlyViewedNews([]);
        }
      }
    }
  }, []);


  const cleanText = (text: string) => text.replace(/\*\*/g, "");

  const fetchTodayWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:33333/weather/by-date`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city: "Seoul", date: todaySeoul }),
        }
      );

      if (!res.ok) {
        throw new Error(`요약을 불러오지 못했습니다. (${res.status})`);
      }

      const data = await res.json();
      setSummary(data.summary);
      setDataPoints(data.data_points || []);
    } catch (err: any) {
      setError(err?.message || "알 수 없는 오류가 발생했습니다.");
      setSummary(null);
      setDataPoints([]);
    } finally {
      setLoading(false);
    }
  };

  const ensureAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.onended = () => setIsPlaying(false);
    audio.onpause = () => setIsPlaying(false);
    return audio;
  };

  const playTts = async () => {
    const audio = ensureAudio();

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    // 이미 받은 오디오가 있으면 바로 재생
    if (audioUrl) {
      if (audio.src !== audioUrl) {
        audio.src = audioUrl;
      }
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err: any) {
        setError(err?.message || "TTS 재생에 실패했습니다.");
      }
      return;
    }

    setTtsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:33333/weather/summary/tts?city=Seoul&date=${todaySeoul}`,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        throw new Error(`TTS를 불러오지 못했습니다. (${res.status})`);
      }

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("audio")) {
        throw new Error("오디오 스트림이 아닙니다.");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      audio.src = url;
      await audio.play();
      setIsPlaying(true);
    } catch (err: any) {
      setError(err?.message || "TTS 재생에 실패했습니다.");
      setIsPlaying(false);
    } finally {
      setTtsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up only on unmount to avoid interrupting play() mid-flight
      audioRef.current?.pause();
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* 사이드바 */}
      <aside className={`min-w-64 bg-white border-l overflow-y-auto w-[15%]`}>
        <div className="p-4 h-[50%]">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg mb-4 font-medium transition-colors shadow-sm text-sm">
            최근 본 항목
          </button>

          <div className="space-y-3">
            {recentlyViewedNews ? recentlyViewedNews.map((item, idx) => (
              <div key={idx} className="pb-3 border-b border-gray-100" onClick={() => router.push(`/detail?articleId=${item.article_id}&category=${item.category}`)}>
                <p className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                  {item.title}
                </p>
              </div>
            )) : null}
          </div>
        </div>
        <div className="p-4 h-[50%]">
          <button
            onClick={fetchTodayWeather}
            disabled={loading}
            className={`w-full ${loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
              } text-white py-2.5 rounded-lg mb-4 font-medium transition-colors shadow-sm text-sm`}
          >
            오늘 날씨 요약
          </button>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          {summary && (
            <div className="mt-3 space-y-3">
              <div className="rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-3 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-blue-700">
                    서울 · {todaySeoul}
                  </p>
                  <button
                    onClick={playTts}
                    disabled={ttsLoading}
                    className={`text-xs px-2 py-1 rounded-md border ${isPlaying
                      ? "border-blue-600 text-blue-600 bg-white"
                      : "border-blue-500 text-blue-700 bg-blue-50 hover:bg-blue-100"
                      } ${ttsLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {isPlaying ? "일시정지" : "요약 듣기"}
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                  {cleanText(summary)}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {dataPoints.map((point, idx) => (
                  <div
                    key={`${point.time}-${idx}`}
                    className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex items-center justify-between text-sm font-semibold text-gray-800">
                      <span>{point.time?.slice(11, 16) || "--:--"}</span>
                      <span className="text-xs text-blue-700">
                        {point.weather || "-"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-700">
                      기온 {point.temp ?? "-"}°C · 체감 {point.feels_like ?? "-"}°C · 습도 {point.humidity ?? "-"}% · 바람 {point.wind_speed ?? "-"}m/s
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
