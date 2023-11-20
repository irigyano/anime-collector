import { WorkData } from "@/app/types/types";
import BrowseGrid from "@/app/components/BrowseGrid/BrowseGrid";
import ReduxBroadcaster from "../ReduxBroadcaster";
import { getUserFromSession } from "@/lib/utils";

const BrowseGridDataFetcher = async ({
  workYear,
  workSeason,
  workTitle,
}: {
  workYear: string;
  workSeason: string;
  workTitle: string;
}) => {
  const endpoint = workTitle
    ? `${process.env.HOST_URL}/api/search/title?title=${workTitle}`
    : `${process.env.HOST_URL}/api/search/season?year=${workYear}&season=${workSeason}`;
  const res = await fetch(endpoint);
  const workData: WorkData[] = await res.json();

  const currentUser = await getUserFromSession();

  return (
    <>
      <ReduxBroadcaster currentUser={currentUser}>
        <BrowseGrid
          workData={workData}
          workYear={workYear}
          workSeason={workSeason}
          workTitle={workTitle}
        />
      </ReduxBroadcaster>
    </>
  );
};

export default BrowseGridDataFetcher;
