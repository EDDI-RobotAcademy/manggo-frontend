"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArticleListItem } from "@/types/newsType";

export default function NewsItem({ article }: { article: ArticleListItem }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const publishedAt =
    article.published_at && !Array.isArray(article.published_at)
      ? new Date(article.published_at)
      : null;
  const publishedLabel = publishedAt
    ? new Intl.DateTimeFormat("ko-KR", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(publishedAt)
    : "";

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("articleId", String(article.article_id));
    router.push(`/detail?${params.toString()}`);
  };

  const summaryPreview =
    article.latest_summary_text?.slice(0, 140) ||
    article.title?.slice(0, 140) ||
    "";

  return (
    <li
      className="flex gap-4 items-start p-3 md:p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-gray-100"
      onClick={handleClick}
    >
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          {article.category_name && (
            <span className="rounded-full bg-gray-100 px-2 py-1">
              {article.category_name}
            </span>
          )}
          {article.publisher_name && (
            <span className="rounded-full bg-gray-100 px-2 py-1">
              {article.publisher_name}
            </span>
          )}
          {publishedLabel && <span>{publishedLabel}</span>}
        </div>
        <h3 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-2">
          {article.title}
        </h3>
        {summaryPreview && (
          <p className="text-sm text-gray-600 line-clamp-3">{summaryPreview}</p>
        )}
      </div>
      <div className="w-28 h-20 md:w-32 md:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            No image
          </div>
        )}
      </div>
    </li>
  );
}
