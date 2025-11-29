export interface ArticleListItem {
  article_id: number;
  title: string;
  category_name?: string | null;
  publisher_name?: string | null;
  image_url?: string | null;
  url?: string | null;
  published_at?: string | null;
  latest_summary_text?: string | null;
}

export interface ArticleDetail {
  article_id: number;
  title: string;
  content?: string | null;
  category_name?: string | null;
  publisher_name?: string | null;
  url?: string | null;
  image_url?: string | null;
  published_at?: string | null;
  summary_text?: string | null;
  summary_created_at?: string | null;
}

export interface CategoryItem {
  category_id: number;
  category_name: string;
}
