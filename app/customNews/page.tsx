import MainWrapper from "@/app/components/MainWrapper";
import { QueryStringType } from "@/types/queryStringType";
import CustomNews from "@/app/components/CustomNews";
import { cookies } from "next/headers";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

interface Props {
  searchParams: Promise<SearchParams>; // Promise 타입!
}

export default async function CustomNewsPage({ searchParams }: Props) {
  const params: QueryStringType = await searchParams;

  const cookieStore = cookies();
  const sessionId = (await cookieStore).get('session_id')?.value;
  let detailData = null;

  if (params.sno) {
    detailData = await fetch(`${process.env.API_BASE_URL}/custom-news/detail?summary_id=${params.sno}`, {
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
        return null;
      });
  }


  return (
    <MainWrapper searchParams={params}>
      <CustomNews detailData={detailData} />
    </MainWrapper>
  );
}
