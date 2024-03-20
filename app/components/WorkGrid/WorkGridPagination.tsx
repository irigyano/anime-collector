"use client";
import { WorkData } from "@/app/types/types";
import WorkCard from "../Work/WorkCard";
import { useEffect, useState } from "react";
import { parseAsInteger, useQueryState } from "next-usequerystate";

function paginateArray<T>(
  inputArray: T[],
  pageIndex: number,
  pageSize: number,
): T[] {
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  return inputArray.slice(startIndex, endIndex);
}

const WorkGridPagination = ({ workData }: { workData: WorkData[] }) => {
  const [pageParam, setPageParam] = useQueryState("page", parseAsInteger);

  const workPerPage = 12;
  const maxPagination = Math.ceil(workData.length / workPerPage) - 1;

  const paginationIndex = Math.min(
    Math.max(Number(pageParam) - 1, 0),
    maxPagination,
  );

  const [pagination, setPagination] = useState(paginationIndex);

  useEffect(() => {
    setPageParam(paginationIndex + 1);
  }, []);

  useEffect(() => {
    setPagination(paginationIndex);
  }, [paginationIndex]);

  return (
    <>
      <section className="grid grid-cols-1 pb-16 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {paginateArray(workData, pagination, workPerPage).map((work) => {
          return <WorkCard key={work.annictId} work={work} />;
        })}
      </section>
      <div className="fixed bottom-0 left-1/2 flex -translate-x-1/2 justify-center p-4 2xl:bottom-8">
        <div className="flex w-max justify-center gap-2 rounded-lg bg-white/80 px-4 py-1 dark:bg-black/80">
          <button
            className={`${pagination === 0 ? "pointer-events-none text-gray-500" : "hover:text-blue-500"}`}
            onClick={() => {
              if (pagination === 0) return;
              setPageParam(pagination, { history: "push" });
              setPagination((prev) => prev - 1);
            }}
          >
            上一頁
          </button>
          <h1>
            第 {pagination + 1} / {maxPagination + 1} 頁
          </h1>
          <button
            className={`${pagination === maxPagination ? "pointer-events-none text-gray-500" : "hover:text-blue-500"}`}
            onClick={() => {
              if (pagination === maxPagination) return;
              setPageParam(pagination + 2, { history: "push" });
              setPagination((prev) => prev + 1);
            }}
          >
            下一頁
          </button>
        </div>
      </div>
    </>
  );
};

export default WorkGridPagination;
