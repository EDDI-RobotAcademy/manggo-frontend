"use client";

import NewsItem from "./NewsItem";

const newsItems = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: "요약 뉴스 1",
  images: [],
}));

const hashtags = ["이재명", "북한", "트럼프", "트럼프", "트럼프", "트럼프"];

export default function NewsList() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <ul className="space-y-2 border">
        {newsItems.map((news) => (
          <NewsItem key={news.id} news={news} />
        ))}

        <div className="sticky bottom-0 left-0 right-0 bg-white border-t shadow-lg h-[2rem]">
          {hashtags.map((tag, idx) => (
            <button
              key={idx}
              className="px-3 py-1 text-xs md:text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              # {tag}
            </button>
          ))}
        </div>
      </ul>
    </div>
  );
}
