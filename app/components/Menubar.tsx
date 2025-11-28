"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QueryStringType } from "@/types/queryStringType";
import { useAuth } from "@/contexts/AuthContext";

const categories = [
  { id: "social", label: "사회" },
  { id: "politics", label: "정치" },
  { id: "economy", label: "경제" },
  { id: "entertainment", label: "연예" },
  { id: "sports", label: "스포츠" },
  { id: "it", label: "IT" },
  { id: "customNews", label: "맞춤뉴스요약" },
];

export default function Menubar({ query }: { query?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    query || "social",
  );

  const { isLoggedIn } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("social");
    }
  }, [searchParams]);

  const movePage = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);

    console.log(params.toString());

    if (categoryId === "customNews") {
      router.push(`/customHistory?category=${categoryId}`);
    } else {
      router.push(`/?category=${categoryId}`);
    }
  };

  return (
    <>
      <aside
        className={`
          min-w-40 bg-white border-r w-[10%]
          flex flex-col gap-2 p-4 overflow-y-auto
        `}
      >
        {categories.map((category) => {
          if (category.id === "customNews" && !isLoggedIn) {
            return null;
          }
          return (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                movePage(category.id);
              }}
              className={`px-4 py-3 rounded-lg text-center font-medium transition-all ${selectedCategory === category.id
                  ? "bg-gray-700 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {category.label}
            </button>
          );
        })}
      </aside>
    </>
  );
}
