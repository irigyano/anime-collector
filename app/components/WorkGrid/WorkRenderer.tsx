import { WorkData } from "@/app/types/types";
import { getUserFromSession } from "@/lib/utils";
import WorkGridPagination from "./WorkGridPagination";

const WorkRenderer = async ({
  workYear,
  workSeason,
  workTitle,
}: {
  workYear?: string;
  workSeason?: string;
  workTitle?: string;
}) => {
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
        <WorkGridPagination workData={workData} currentUser={currentUser} />
      )}
    </>
  );
};

export default WorkRenderer;
