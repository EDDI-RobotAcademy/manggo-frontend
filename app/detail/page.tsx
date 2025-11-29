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

export default async function DetailPage({ searchParams }: Props) {
  const params = await searchParams;
  const articleIdParam = Array.isArray(params.articleId)
    ? params.articleId[0]
    : params.articleId;

  const typedParams = { ...params, articleId: articleIdParam } as QueryStringType;
  const article = await fetchArticleDetail(articleIdParam);

  return (
    <MainWrapper searchParams={typedParams}>
      <NewsDetail article={article} />
    </MainWrapper>
  );
}
