import NewsList from "@/app/components/NewsList";
import MainWrapper from "@/app/components/MainWrapper";
import { QueryStringType } from "@/types/queryStringType";
import { ArticleListItem } from "@/types/newsType";

interface SearchParams {
    [key: string]: string | string[] | undefined;
}

interface Props {
    searchParams: Promise<SearchParams>; // Promise 타입!
}

const CATEGORY_ID_MAP: Record<string, number> = {
  social: 1,
  politics: 2,
  economy: 3,
  entertainment: 4,
  sports: 5,
  it: 6,
};

async function fetchArticles(params: QueryStringType): Promise<ArticleListItem[]> {
  const apiBase = process.env.API_BASE_URL;
  if (!apiBase) {
    console.warn("[Main] API_BASE_URL is not set");
    return [];
  }

  const query = new URLSearchParams({ page: "1", size: "20" });
  const categoryKey = Array.isArray(params.category) ? params.category[0] : params.category;
  const categoryId = categoryKey ? CATEGORY_ID_MAP[categoryKey] : undefined;
  if (categoryId) {
    query.set("category_id", String(categoryId));
  }

  try {
    const res = await fetch(`${apiBase}/news/articles?${query.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.warn("[Main] Failed to fetch articles:", res.status);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data?.items) ? data.items : [];
  } catch (err) {
    console.error("[Main] Error while fetching articles:", err);
    return [];
  }
}

export default async function Main({ searchParams }: Props) {
  const params: QueryStringType = await searchParams;
  const articles = await fetchArticles(params);

  return (
    <MainWrapper searchParams={params}>
      <NewsList articles={articles} />
    </MainWrapper>
  );
}
