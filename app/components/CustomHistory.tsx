'use client'

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export interface NewsListType {
    created_at: string;
    file_name: string;
    source_type: string;
    source_url: string;
    summary_id: number;
    summary_text: string;
    summary_title: string;
    user_id: string;
}

export interface NewsPageData {
    customNewsList: NewsListType[];
    page: number;
    total: number;
    size: number;
}

export default function CustomHistory({ dataList }: { dataList: NewsPageData }) {

    const router = useRouter();
    const useSearch = useSearchParams();


    const moveDetail = (sno?: string) => {

        const searchParams = new URLSearchParams(useSearch.toString());
        if (sno) {
            searchParams.set("sno", sno || "");
        }
        router.push(`/customNews?${searchParams.toString()}`);

    }

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-4xl mx-auto border border-gray-300">
                <div className="flex justify-between items-start p-2">
                    <div className="flex-1"></div>
                    <div className="text-right">
                        <button className="px-2 py-1 bg-gray-700 text-white rounded-lg cursor-pointer" onClick={() => moveDetail()}>요청하기</button>
                    </div>
                </div>

                <div className="p-6">
                    {dataList && dataList?.customNewsList && dataList?.customNewsList.length > 0 ? dataList?.customNewsList.map((item, index) => (
                        <div
                            key={index}
                            className="py-4 border-b border-gray-100 last:border-b-0 cursor-pointer"
                            onClick={() => moveDetail(item.summary_id.toString())}
                        >
                            <div className="text-sm text-gray-600 mb-1">{item.created_at.replace("T", " ")}</div>
                            <div className="text-sm text-gray-800">{item.summary_title}</div>
                        </div>
                    )) : <p className="text-gray-600">데이터가 없습니다.</p>}
                </div>
            </div>
        </div>
    );
}