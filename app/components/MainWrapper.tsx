"use client";

import Header from "@/app/components/Header";
import Menubar from "@/app/components/Menubar";
import RecentViews from "@/app/components/RecentViews";
import { QueryStringType } from "@/types/queryStringType";
import { usePathname } from "next/navigation";

export default function MainWrapper({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: QueryStringType;
}) {
  const query = Array.isArray(searchParams?.category)
    ? searchParams.category[0]
    : searchParams?.category;

  const pathname = usePathname();

  console.log(pathname);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex overflow-hidden min-w-[1024px]">
        <Menubar query={query} />
        <main
          className={`flex-1 min-w-[400px] ${pathname === "/detail" ? "overflow-y-hidden" : "overflow-y-auto"} bg-white h-full`}
        >
          {children}
        </main>
        <RecentViews />
      </div>
    </div>
  );
}
