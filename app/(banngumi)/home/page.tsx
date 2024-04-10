import { Suspense } from "react";
import WorkRenderer from "../../components/WorkGrid/WorkRenderer";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";
import type { Metadata } from "next";
import { ServerProps } from "../../../types/types";
import { DEFAULT_SEASON, DEFAULT_YEAR, seasonMap } from "@/lib/utils";

export async function generateMetadata({
  searchParams,
}: ServerProps): Promise<Metadata> {
  const workYear = searchParams.year || DEFAULT_YEAR;
  const workSeason = searchParams.season || DEFAULT_SEASON;

  return {
    title: `${workYear} ${seasonMap[workSeason]}`,
  };
}

const HomePage = ({ searchParams }: ServerProps) => {
  const workYear = searchParams.year;
  const workSeason = searchParams.season;
  return (
    <>
      <Suspense
        key={`${workYear}${workSeason}`}
        fallback={<LoadingPlaceholder />}
      >
        <WorkRenderer workYear={workYear} workSeason={workSeason} />
      </Suspense>
    </>
  );
};

export default HomePage;
