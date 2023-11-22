import { Suspense } from "react";
import WorkRenderer from "./components/WorkGrid/WorkRenderer";
import LoadingPlaceholder from "./components/LoadingPlaceholder";
import type { Metadata } from "next";
import { ServerProps } from "./types/types";
import { DEFAULT_SEASON, DEFAULT_YEAR, seasonMap } from "@/lib/utils";

export async function generateMetadata({
  searchParams,
}: ServerProps): Promise<Metadata> {
  const workYear = searchParams.year || DEFAULT_YEAR;
  const workSeason = searchParams.season || DEFAULT_SEASON;
  const workTitle = searchParams.title;

  let title = "Banngumi View";
  if (workTitle) title = `${workTitle} | ${title}`;
  else if (workYear && workSeason && seasonMap[workSeason]) {
    title = `${workYear} ${seasonMap[workSeason]}季番 | ${title}`;
  }
  return {
    title,
  };
}

const HomePage = ({ searchParams }: ServerProps) => {
  const workYear = searchParams.year;
  const workSeason = searchParams.season;
  const workTitle = searchParams.title;

  return (
    <>
      <Suspense
        key={
          workTitle || (workYear && workSeason)
            ? `${workYear}${workSeason}`
            : ""
        }
        fallback={<LoadingPlaceholder />}
      >
        <WorkRenderer
          workYear={workYear}
          workSeason={workSeason}
          workTitle={workTitle}
        />
      </Suspense>
    </>
  );
};

export default HomePage;
