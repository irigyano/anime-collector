"use client";
import { UserClientSide, WorkData } from "@/app/types/types";
import WorkCard from "../Work/WorkCard";
import ReduxBroadcaster from "../ReduxBroadcaster";
import { useEffect, useState } from "react";
import { parseAsInteger, useQueryState } from "next-usequerystate";

function paginateArray<T>(
  inputArray: T[],
  pageIndex: number,
  pageSize: number
): T[] {
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  return inputArray.slice(startIndex, endIndex);
}

const WorkGrid = ({
  workData,
  currentUser,
  workYear,
  workSeason,
}: {
  workData: WorkData[];
  currentUser: UserClientSide | null;
  workYear: string;
  workSeason: string;
}) => {
  const [pageParam, setPageParam] = useQueryState("page", parseAsInteger);
  const [yearParam, setYearParam] = useQueryState("year");
  const [seasonParam, setSeasonParam] = useQueryState("season");

  let pageState = Math.max(Number(pageParam) - 1, 0);
  const workPerPage = 12;
  const maxPagination = Math.ceil(workData.length / workPerPage) - 1;
  if (pageState > maxPagination) pageState = maxPagination;
  const [pagination, setPagination] = useState(pageState);

  useEffect(() => {
    setYearParam(workYear);
    setSeasonParam(workSeason);
  }, []);

  return (
    <ReduxBroadcaster currentUser={currentUser}>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 pb-16">
        {paginateArray(workData, pagination, workPerPage).map((work) => {
          return <WorkCard key={work.annictId} work={work} />;
        })}
      </section>
      <div className="p-4 fixed bottom-0 2xl:bottom-8 left-1/2 -translate-x-1/2 flex justify-center">
        <div className="py-1 px-4 flex justify-center gap-2 bg-white/80 dark:bg-black/80 rounded-lg w-max">
          <button
            className={`${pagination === 0 && "text-gray-500"}`}
            onClick={() => {
              if (pagination === 0) return;
              setPageParam(pagination);
              setPagination((prev) => prev - 1);
            }}
          >
            上一頁
          </button>
          <h1>
            第 {pagination + 1} / {maxPagination + 1} 頁
          </h1>
          <button
            className={`${pagination === maxPagination && "text-gray-500"}`}
            onClick={() => {
              if (pagination === maxPagination) return;
              setPageParam(pagination + 2);
              setPagination((prev) => prev + 1);
            }}
          >
            下一頁
          </button>
        </div>
      </div>
    </ReduxBroadcaster>
  );
};

export default WorkGrid;
