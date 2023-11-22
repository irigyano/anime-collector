import { WorkData } from "@/app/types/types";
import { DEFAULT_SEASON, DEFAULT_YEAR, getUserFromSession } from "@/lib/utils";
import WorkGridPagination from "./WorkGridPagination";
import SeasonSelector from "./SeasonSelector";

const WorkRenderer = async ({
  workYear,
  workSeason,
  workTitle,
}: {
  workYear: string | undefined;
  workSeason: string | undefined;
  workTitle: string | undefined;
}) => {
  if (!workYear) workYear = DEFAULT_YEAR;
  if (!workSeason) workSeason = DEFAULT_SEASON;

  const endpoint = workTitle
    ? `${process.env.HOST_URL}/api/search/title?title=${workTitle}`
    : `${process.env.HOST_URL}/api/search/season?year=${workYear}&season=${workSeason}`;
  const res = await fetch(endpoint);
  const workData: WorkData[] = await res.json();

  const currentUser = await getUserFromSession();

  return (
    <>
      {workData.length === 0 ? (
        <div className="pt-[25vh] text-xl lg:text-3xl text-center">
          {/* @ts-ignore: checked already */}
          找不到符合搜尋字詞「
          {workTitle ? workTitle : `${workYear} 年 ${workSeason}`}
          」的作品。
        </div>
      ) : (
        <>
          <SeasonSelector workYear={workYear} workSeason={workSeason} />
          <WorkGridPagination
            workData={workData}
            currentUser={currentUser}
            workYear={workYear}
            workSeason={workSeason}
          />
        </>
      )}
    </>
  );
};

export default WorkRenderer;
