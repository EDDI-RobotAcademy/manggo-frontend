import MainWrapper from "@/app/components/MainWrapper";
import NewsDetail from "@/app/components/NewsDetail";
import { QueryStringType } from "@/types/queryStringType";

interface SearchParams {
    [key: string]: string | string[] | undefined;
}

interface Props {
    searchParams: Promise<SearchParams>; // Promise 타입!
}

export default async function DetailPage({ searchParams }: Props) {
    const params: QueryStringType = await searchParams;

    return (
        <MainWrapper searchParams={params}>
            <NewsDetail />
        </MainWrapper>
    )
}