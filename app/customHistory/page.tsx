import MainWrapper from "@/app/components/MainWrapper";
import { QueryStringType } from "@/types/queryStringType";
import CustomHistory from "@/app/components/CustomHistory";
import { cookies } from "next/headers";

interface SearchParams {
    [key: string]: string | string[] | undefined;
}

interface Props {
    searchParams: Promise<SearchParams>; // Promise 타입!
}

export default async function CustomHistoryPage({ searchParams }: Props) {
    const params: QueryStringType = await searchParams;

    const cookieStore = cookies();
    const sessionId = (await cookieStore).get('session_id')?.value;

    const dataList = await fetch(`${process.env.API_BASE_URL}/custom-news/list`, {
        method: "GET",
        headers: {
            'Cookie': `session_id=${sessionId}`,
        },
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.error(err);
        });


    return (
        <MainWrapper searchParams={params}>
            <CustomHistory dataList={dataList} />
        </MainWrapper>
    );
}
