import NewsList from "@/app/components/NewsList";
import MainWrapper from "@/app/components/MainWrapper";
import { QueryStringType } from "@/types/queryStringType";
import { ArticleListItem, CategoryItem } from "@/types/newsType";

interface SearchParams {
    [key: string]: string | string[] | undefined;
}

interface Props {
    searchParams: Promise<SearchParams>; // Promise 타입!
}

const CATEGORY_FALLBACK_NAME: Record<string, string> = {
  social: "Society",
  politics: "Politics",
  economy: "Economy",
  entertainment: "Entertainment",
  sports: "Sports",
  it: "IT",
};

async function fetchCategories(): Promise<CategoryItem[]> {
  const apiBase = process.env.API_BASE_URL;
  if (!apiBase) return [];
  try {
    const res = await fetch(`${apiBase}/news/categories`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn("[Main] Failed to load categories:", err);
    return [];
  }
}

async function fetchArticles(params: QueryStringType, categories: CategoryItem[]): Promise<ArticleListItem[]> {
  const apiBase = process.env.API_BASE_URL;
  if (!apiBase) {
    console.warn("[Main] API_BASE_URL is not set");
    return [];
  }

  const query = new URLSearchParams({ page: "1", size: "20" });
  const categoryKey = Array.isArray(params.category) ? params.category[0] : params.category;

  const categoriesByName = new Map(
    categories.map((c) => [c.category_name.toLowerCase(), c.category_id]),
  );
  const fallbackName = categoryKey ? CATEGORY_FALLBACK_NAME[categoryKey] : undefined;
  const categoryId = fallbackName
    ? categoriesByName.get(fallbackName.toLowerCase())
    : categoryKey
      ? categoriesByName.get(categoryKey.toLowerCase())
      : undefined;

  if (categoryId !== undefined) {
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
  const categories = await fetchCategories();
  const articles = await fetchArticles(params, categories);

  return (
    <MainWrapper searchParams={params}>
      <NewsList articles={articles} />
    </MainWrapper>
  );
}
