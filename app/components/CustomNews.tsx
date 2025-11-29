"use client";

import React, { useActionState, useEffect, useState, useRef } from "react";
import { Upload, ArrowUp } from "lucide-react";
import { CustomNewsType } from "@/types/customNewsType";
import { createSummaryFromUrlAction } from "../lib/customUrlAction";
import { useRouter } from "next/navigation";

export interface MessageType {
  text: string;
  type: string;
}

const initialState = {
  summaryResult: null,
  error: null,
  isSubmitting: false,
};

export default function CustomNews({
  detailData,
}: {
  detailData: CustomNewsType;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useActionState(
    createSummaryFromUrlAction,
    initialState,
  );

  const router = useRouter();

  useEffect(() => {
    if (detailData) {
      setMessages([
        {
          text:
            detailData.source_type == "URL"
              ? detailData.source_url
              : detailData.file_name,
          type: "user",
        },
        {
          text: "해당 정보를 요약해서 알려드리겠습니다.",
          type: "assistant",
        },
        {
          text:
            "요약 제목 : " +
            detailData.summary_title +
            "\n요약 내용 : " +
            detailData.summary_text,
          type: "assistant",
        },
      ]);
    }
  }, [detailData]);

  useEffect(() => {
    if (state.summaryResult) {
      console.log("Server Action 성공 응답:", state.summaryResult);
      setIsVisible(true);

      setMessages((prev) => [
        ...prev,
        {
          text: `요약이 완료되었습니다`,
          type: "assistant",
        },
        {
          text:
            "요약 제목 : " +
            state.summaryResult.summary_title +
            "\n요약 내용 : " +
            state.summaryResult.summary_text,
          type: "assistant",
        },
      ]);
    } else if (state.error) {
      console.log("Server Action 오류:", state.error);
      setMessages((prev) => [
        ...prev,
        {
          text: `요약 실패: ${state.error.detail || "알 수 없는 오류"}`,
          type: "assistant",
        },
      ]);
    }
  }, [state]);

  const handleSend = () => {
    console.log(detailData);
    if (message.trim()) {
      setMessages([...messages, { text: message, type: "user" }]);

      setMessages((prev) => [
        ...prev,
        {
          text: "해당 정보를 요약해서 알려드리겠습니다.",
          type: "assistant",
        },
      ]);

      // Form을 직접 submit
      if (formRef.current) {
        formRef.current.requestSubmit();
      }

      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white ">
      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end">
            <button
              className="px-2 mb-5 py-1 bg-gray-700 text-white rounded-lg cursor-pointer"
              onClick={() => router.back()}
            >
              뒤로가기
            </button>
          </div>
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <h2 className="text-2xl font-light mb-2">
                  요약하고 싶은 URL의 정보를 입력해 주세요
                </h2>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-2xl px-4 py-3 rounded-2xl ${
                      msg.type === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: msg.text.replace(/\n/g, "<br/><br/>"),
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 입력 영역 */}
      {!detailData && !isVisible && (
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <form
              ref={formRef}
              action={formAction}
              className="relative flex items-end bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              {/* 텍스트 입력 */}
              <textarea
                value={message}
                name="url"
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="URL을 입력하세요."
                className="flex-1 px-12 py-3 bg-transparent border-none outline-none resize-none text-gray-900 placeholder-gray-400"
                rows={1}
                style={{
                  maxHeight: "200px",
                  minHeight: "44px",
                }}
              />

              {/* 전송 버튼 */}
              <button
                type="button"
                onClick={handleSend}
                disabled={!message.trim()}
                className={`absolute right-3 bottom-2 p-2 rounded-full transition-all ${
                  message.trim()
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                aria-label="전송"
              >
                <ArrowUp size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
