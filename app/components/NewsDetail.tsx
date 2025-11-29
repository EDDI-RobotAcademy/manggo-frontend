"use client";

import { ArticleDetail } from "@/types/newsType";

export default function NewsDetail({ article }: { article: ArticleDetail | null }) {
  if (!article) {
    return (
      <div className="flex h-full items-center justify-center bg-white text-gray-600">
        Unable to load article.
      </div>
    );
  }

  const publishedAt = article.published_at ? new Date(article.published_at) : null;
  const summaryAt = article.summary_created_at
    ? new Date(article.summary_created_at)
    : null;

  const contentBlocks =
    (article.content || "")
      .split(/\n+/)
      .map((c) => c.trim())
      .filter(Boolean) || [];

  return (
    <div className="flex h-full w-full bg-gray-100">
      {/* Article content */}
      <div className="w-1/2 h-full overflow-y-auto border-r-2 border-gray-200 bg-white">
        <div className="p-6 md:p-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              {article.category_name && (
                <span className="rounded-full bg-gray-100 px-3 py-1">
                  {article.category_name}
                </span>
              )}
              {article.publisher_name && (
                <span className="rounded-full bg-gray-100 px-3 py-1">
                  {article.publisher_name}
                </span>
              )}
              {publishedAt && (
                <span className="text-gray-500">
                  {publishedAt.toLocaleString("ko-KR")}
                </span>
              )}
              {article.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline underline-offset-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  View original
                </a>
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
              {article.title}
            </h2>

            {article.image_url && (
              <div className="overflow-hidden rounded-lg border bg-gray-50">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full object-cover"
                />
              </div>
            )}

            <div className="space-y-4 text-gray-800 leading-relaxed">
              {contentBlocks.length > 0 ? (
                contentBlocks.map((block, idx) => (
                  <p key={idx} className="text-sm md:text-base">
                    {block}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-500">No content available.</p>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200 text-sm text-gray-500">
              {summaryAt && <p>Last summary: {summaryAt.toLocaleString("ko-KR")}</p>}
              {publishedAt && <p>Published: {publishedAt.toLocaleString("ko-KR")}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="w-1/2 h-full overflow-y-auto bg-white">
        <div className="p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Summary</h3>
          {article.summary_text ? (
            <div className="space-y-3 text-gray-800 leading-relaxed">
              {article.summary_text.split(/\n+/).map((line, idx) => (
                <p key={idx} className="text-sm md:text-base">
                  {line.trim()}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No summary available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
