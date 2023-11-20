"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { store } from "../../redux/store";
import { userAuthenticated } from "../../redux/features/user/userSlice";
import { UserClientSide, WorkData } from "@/app/types/types";
import WorkCard from "@/app/components/Work/WorkCard";

const BrowseGrid = ({
  currentUser,
  workData,
  workYear,
  workSeason,
  workTitle,
}: {
  currentUser: UserClientSide | null;
  workData: WorkData[];
  workYear: string;
  workSeason: string;
  workTitle: string;
}) => {
  const [miniPageIndex, setMiniPageIndex] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    store.dispatch(userAuthenticated(currentUser));
    if (workTitle) router.replace(`?title=${workTitle}`);
    else router.replace(`?year=${workYear}&season=${workSeason}`);
  }, []);

  const pagination: WorkData[][] = [];
  for (let i = 0; i < workData.length; i += 12) {
    pagination.push(workData.slice(i, i + 12));
  }
  const miniPageIndexes = [];
  for (let page = 0; page < pagination.length; page++) {
    miniPageIndexes.push(page);
  }

  return (
    <>
      {workData.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-screen pb-40 text-xl lg:text-3xl text-center">
          找不到符合搜尋字詞「{workTitle}」的作品。
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {pagination[miniPageIndex].map((work) => {
              return <WorkCard key={work.annictId} work={work} />;
            })}
          </section>
          <footer className="sticky bottom-1 flex justify-center py-6">
            <div
              className={`bg-gray-100 dark:bg-gray-800 opacity-80 rounded-lg w-max flex justify-center shadow-lg ${
                miniPageIndexes.length === 1 ? "hidden" : null
              }`}
            >
              {miniPageIndexes.map((index) => {
                return (
                  <button
                    className={`m-1 h-6 w-6 rounded-full hover:bg-blue-500 duration-300 ${
                      index === miniPageIndex && "bg-blue-500"
                    }`}
                    key={index}
                    onClick={() => {
                      setMiniPageIndex(index);
                    }}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </footer>
        </>
      )}
    </>
  );
};
export default BrowseGrid;
