import SeasonSelector from "@/app/components/BrowseGrid/SeasonSelector";
import { Suspense } from "react";
import BrowseGridDataFetcher from "./components/BrowseGrid/BrowseGridDataFetcher";
import LoadingPlaceholder from "./components/LoadingPlaceholder";

const HomePage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const workYear = searchParams?.year || "2023";
  const workSeason = searchParams?.season || "autumn";
  const workTitle = searchParams?.title || "";

  return (
    <>
      {!workTitle && (
        <SeasonSelector workYear={workYear} workSeason={workSeason} />
      )}
      <Suspense
        key={workTitle || workSeason + workYear}
        fallback={<LoadingPlaceholder />}
      >
        <BrowseGridDataFetcher
          workYear={workYear}
          workSeason={workSeason}
          workTitle={workTitle}
        />
      </Suspense>
    </>
  );
};

export default HomePage;
