import type { Metadata } from "next";
import WorkGridPagination from "../components/WorkGrid/WorkGridPagination";
import { WorkData } from "../types/types";
import WorkGrid from "../components/WorkGrid/WorkGrid";

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

  if (!workTitle) return <h1>hello?</h1>;

  const res = await fetch(
    `${process.env.HOST_URL}/api/search/title?title=${workTitle}`,
  );
  const workData: WorkData[] = await res.json();

  console.log(workData);

  return (
    <div className="pt-3">
      <WorkGrid workData={workData} />;
    </div>
  );
};

export default SearchPage;
