import { DEFAULT_SEASON, DEFAULT_YEAR } from "@/lib/utils";
import WorkGridPagination from "./WorkGridPagination";
import SeasonSelector from "./SeasonSelector";
import type { Work } from "@/types/work";

const WorkRenderer = async ({
  workYear,
  workSeason,
}: {
  workYear: string | undefined;
  workSeason: string | undefined;
}) => {
  workYear = workYear || DEFAULT_YEAR;
  workSeason = workSeason || DEFAULT_SEASON;

  const endpoint = `${process.env.HOST_URL}/api/search/season?year=${workYear}&season=${workSeason}`;
  const res = await fetch(endpoint);
  const workData: Work[] = await res.json();

  return (
    <>
      {workData.length === 0 ? (
        <div className="pt-[25vh] text-center text-xl lg:text-3xl">
          找不到符合搜尋字詞「
          {`${workYear} 年 ${workSeason}`}
          」的作品。
        </div>
      ) : (
        <>
          <SeasonSelector workYear={workYear} workSeason={workSeason} />
          <WorkGridPagination workData={workData} />
        </>
      )}
    </>
  );
};

export default WorkRenderer;
