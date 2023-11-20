import SeasonSelector from "@/app/components/BrowseGrid/SeasonSelector";
import { Suspense } from "react";
import WorkRenderer from "./components/BrowseGrid/WorkRenderer";
import LoadingPlaceholder from "./components/LoadingPlaceholder";
import Redirector from "./components/Redirector";
import type { Metadata } from "next";
import { ServerProps } from "./types/types";
import { seasonMap } from "@/lib/utils";

export async function generateMetadata({
  searchParams,
}: ServerProps): Promise<Metadata> {
  const workYear = searchParams.year;
  const workSeason = searchParams.season;
  const workTitle = searchParams.title;

  let title = "Banngumi View";
  if (workTitle) title = `${workTitle} | ${title}`;
  else if (workYear && workSeason) {
    const validSeasonCht = seasonMap[workSeason];
    title = `${workYear} ${
      validSeasonCht ? `${validSeasonCht}季番` : workSeason
    } | ${title}`;
  }
  return {
    title,
  };
}

const HomePage = ({ searchParams }: ServerProps) => {
  const workYear = searchParams.year;
  const workSeason = searchParams.season;
  const workTitle = searchParams.title;

  const hasYearAndSeason = !!(workYear && workSeason);
  if (!workTitle && !hasYearAndSeason) return <Redirector />;

  return (
    <>
      <SeasonSelector />
      <Suspense
        key={workTitle || (hasYearAndSeason ? workYear + workSeason : "")}
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
