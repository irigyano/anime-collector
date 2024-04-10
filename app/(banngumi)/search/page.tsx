import type { Metadata } from "next";
import WorkGrid from "@/components/WorkGrid/WorkGrid";
import type { Work } from "@/types/work";

type SearchPageProps = {
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const workTitle = searchParams.title;

  return {
    title: `${workTitle}`,
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const workTitle = searchParams.title;
  const res = await fetch(
    `${process.env.HOST_URL}/api/search/title?title=${workTitle}`,
  );
  const workData: Work[] = await res.json();

  if (!workData.length)
    return (
      <div className="pt-[25vh] text-center text-xl lg:text-3xl">
        找不到符合搜尋字詞「
        {`${workTitle}`}
        」的作品。
      </div>
    );

  return (
    <div className="pt-3">
      <WorkGrid workData={workData} />
    </div>
  );
};

export default SearchPage;
