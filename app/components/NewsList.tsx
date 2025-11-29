"use client";

import NewsItem from "./NewsItem";
import { ArticleListItem } from "@/types/newsType";

export default function NewsList({ articles }: { articles: ArticleListItem[] }) {
  if (!articles.length) {
    return (
      <div className="p-4 md:p-6 max-w-5xl mx-auto">
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-gray-600">
          No news available.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <ul className="space-y-3">
        {articles.map((article) => (
          <NewsItem key={article.article_id} article={article} />
        ))}
      </ul>
    </div>
  );
}
