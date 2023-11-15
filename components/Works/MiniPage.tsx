"use client";
import { WorkData } from "@/components/Works/WorkCard";
import { useState } from "react";
import WorkCard from "@/components/Works/WorkCard";

const MiniPage = ({ workData }: { workData: WorkData[] }) => {
  const [miniPageIndex, setMiniPageIndex] = useState<number>(0);

  // divide data from Annict into pages
  const worksMiniPages: WorkData[][] = [];
  for (let i = 0; i < workData.length; i += 12) {
    worksMiniPages.push(workData.slice(i, i + 12));
  }
  // create index based on pages
  const miniPageIndexes = [];
  for (let page = 0; page < worksMiniPages.length; page++) {
    miniPageIndexes.push(page);
  }

  return (
    <>
      {workData.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-screen pb-40 text-xl lg:text-3xl text-center">
          <div>結果が見つかりませんでした。</div>
          <div>かなを使って検索してみてください。</div>
          <div>例えば、「進撃の巨人」または「ソードアート・オンライン」。</div>
        </div>
      ) : (
        <>
          <section className="flex flex-wrap justify-center">
            {worksMiniPages[miniPageIndex].map((work) => {
              return <WorkCard key={work.annictId} work={work} />;
            })}
          </section>
          <div className="w-full fixed bottom-1 2xl:bottom-14 flex justify-center">
            <div
              className={`bg-gray-100 dark:bg-gray-800 opacity-80 rounded-lg w-max flex justify-center shadow-lg ${
                miniPageIndexes.length === 1 ? "hidden" : null
              }`}
            >
              {miniPageIndexes.map((index) => {
                return (
                  <button
                    className={`m-1 h-6 w-6 rounded-full hover:bg-blue-500 duration-300 ${
                      index === miniPageIndex ? "bg-blue-500" : null
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
          </div>
          <div className="w-full h-10" />
        </>
      )}
    </>
  );
};
export default MiniPage;
