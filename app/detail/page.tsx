import MainWrapper from "@/app/components/MainWrapper";
import NewsDetail from "@/app/components/NewsDetail";
import { QueryStringType } from "@/types/queryStringType";
import { ArticleDetail } from "@/types/newsType";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

async function fetchArticleDetail(articleId?: string): Promise<ArticleDetail | null> {
  if (!articleId) return null;

  const apiBase = process.env.API_BASE_URL;
  if (!apiBase) {
    console.warn("[Detail] API_BASE_URL is not set");
    return null;
  }

  try {
    const res = await fetch(`${apiBase}/news/articles/${articleId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.warn("[Detail] Failed to fetch article detail:", res.status);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error("[Detail] Error while fetching article detail:", err);
    return null;
  }
}

async function summarizeArticleIfNeeded(article: ArticleDetail | null): Promise<ArticleDetail | null> {
  if (!article) return null;
  if (article.summary_text || !article.content) {
    return article;
  }

  const apiBase = process.env.API_BASE_URL;
  if (!apiBase) {
    console.warn("[Detail] API_BASE_URL is not set, skip summarize.");
    return article;
  }

  try {
    const res = await fetch(`${apiBase}/news/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: article.content,
        article_id: article.article_id,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("[Detail] summarize failed:", res.status);
      return article;
    }

    const data = await res.json();
    const summary = data?.summary || null;

    if (!summary) return article;

    return {
      ...article,
      summary_text: summary,
      summary_created_at: new Date().toISOString(),
    };
  } catch (err) {
    console.warn("[Detail] summarize error:", err);
    return article;
  }
}

export default async function DetailPage({ searchParams }: Props) {
  const params = await searchParams;
  const articleIdParam = Array.isArray(params.articleId)
    ? params.articleId[0]
    : params.articleId;

  const typedParams = { ...params, articleId: articleIdParam } as QueryStringType;
  const article = await fetchArticleDetail(articleIdParam);
  const articleWithSummary = await summarizeArticleIfNeeded(article);

  return (
    <MainWrapper searchParams={typedParams}>
      <NewsDetail article={articleWithSummary} />
    </MainWrapper>
  );
}
