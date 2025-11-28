import MainWrapper from "@/app/components/MainWrapper";
import { QueryStringType } from "@/types/queryStringType";
import CustomNews from "@/app/components/CustomNews";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

interface Props {
  searchParams: Promise<SearchParams>; // Promise 타입!
}

export default async function CustomNewsPage({ searchParams }: Props) {
  const params: QueryStringType = await searchParams;

  return (
    <MainWrapper searchParams={params}>
      <CustomNews />
    </MainWrapper>
  );
}
