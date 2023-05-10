"use client";
import { WorkData } from "@/components/Works/WorkCard";
import { useState } from "react";
import WorkCard from "@/components/Works/WorkCard";
import SeasonSelector from "@/components/Works/SeasonSelector";
import Loading from "../../app/loading";

export type SeasonInfo = {
  year: number;
  season: string;
};

type MiniPageProps = {
  worksData: WorkData[];
  mode: string;
};

const MiniPage = ({ worksData, mode }: MiniPageProps) => {
  const [miniPageIndex, setMiniPageIndex] = useState<number>(0);
  const [works, setWork] = useState<WorkData[] | null>(worksData);
  const [isSearchPage, setIsSearchPage] = useState(false);

  if (works === null) {
    return <Loading />;
  }

  // highlighting SeasonSelector condition
  const seasonInfo: SeasonInfo = { year: 2023, season: "" };
  if ((works.length > 0 && mode === "view") || isSearchPage) {
    seasonInfo["year"] = works[0].seasonYear;
    seasonInfo["season"] = works[0].seasonName;
  }

  // divide data from Annict into pages
  const worksMiniPages: WorkData[][] = [];
  for (let i = 0; i < works.length; i += 12) {
    worksMiniPages.push(works.slice(i, i + 12));
  }
  // create index based on pages
  const miniPageIndexes = [];
  for (let page = 0; page < worksMiniPages.length; page++) {
    miniPageIndexes.push(page);
  }

  return (
    <>
      <SeasonSelector
        setWork={setWork}
        seasonInfo={seasonInfo}
        setMiniPageIndex={setMiniPageIndex}
        setIsSearchPage={setIsSearchPage}
      />

      <section className="flex flex-wrap justify-center">
        {worksMiniPages[miniPageIndex].map((work) => {
          return <WorkCard key={work.annictId} work={work} />;
        })}
      </section>

      <div className="w-screen fixed bottom-1 2xl:bottom-14 flex justify-center">
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
      <div className="w-screen h-10" />
    </>
  );
};
export default MiniPage;
