"use client";

import { SetStateAction, useState } from "react";
import { WorkData } from "@/components/Works/WorkCard";
import { SeasonInfo } from "./MiniPage";

const fetchWorkByYear = async (
  year: string,
  season: string,
  stateSetter: React.Dispatch<SetStateAction<WorkData[] | null>>,
  indexSetter: React.Dispatch<SetStateAction<number>>
) => {
  const response = await fetch(`/api/search/seasons?season=${year}-${season}`, {
    // cache: "no-store",
  });

  const data = await response.json();
  stateSetter(data);
  // reset the page index
  indexSetter(0);
  // switching from search mode to view mode, set seasonInfo to default
};

const SeasonSelector = ({
  setWork,
  setMiniPageIndex,
  seasonInfo,
  setIsSearchPage,
}: {
  setWork: React.Dispatch<SetStateAction<WorkData[] | null>>;
  setMiniPageIndex: React.Dispatch<SetStateAction<number>>;
  seasonInfo: SeasonInfo;
  setIsSearchPage: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [Year, setYear] = useState(seasonInfo.year.toString());

  const years: number[] = [];

  for (let year = 2024; year > 1994; year--) {
    years.push(year);
  }
  return (
    <nav className="flex justify-center gap-4 m-2">
      <select
        onChange={(e) => {
          setYear(e.target.value);
        }}
        size={1}
        className="border rounded-xl px-1 bg-[#fff] dark:bg-[#0f0f0f]"
        defaultValue={seasonInfo.year}
      >
        {years.map((year, index) => {
          return (
            <option key={index} value={year}>
              {year}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => {
          setWork(null);
          setIsSearchPage(true);
          fetchWorkByYear(Year, "winter", setWork, setMiniPageIndex);
        }}
        className={`border-2 rounded-full w-7 h-7 duration-500 hover:bg-winter border-winter ${
          seasonInfo.season === "WINTER" ? "bg-winter" : null
        }`}
      >
        冬
      </button>
      <button
        onClick={() => {
          setWork(null);
          setIsSearchPage(true);

          fetchWorkByYear(Year, "spring", setWork, setMiniPageIndex);
        }}
        className={`border-2 rounded-full w-7 h-7 duration-500 hover:bg-spring border-spring ${
          seasonInfo.season === "SPRING" ? "bg-spring" : null
        }`}
      >
        春
      </button>
      <button
        onClick={() => {
          setIsSearchPage(true);
          setWork(null);
          fetchWorkByYear(Year, "summer", setWork, setMiniPageIndex);
        }}
        className={`border-2 rounded-full w-7 h-7 duration-500 hover:bg-summer border-summer ${
          seasonInfo.season === "SUMMER" ? "bg-summer" : null
        }`}
      >
        夏
      </button>
      <button
        onClick={() => {
          setIsSearchPage(true);
          setWork(null);
          fetchWorkByYear(Year, "autumn", setWork, setMiniPageIndex);
        }}
        className={`border-2 rounded-full w-7 h-7 duration-500 hover:bg-autumn border-autumn ${
          seasonInfo.season === "AUTUMN" ? "bg-autumn" : null
        }`}
      >
        秋
      </button>
    </nav>
  );
};
export default SeasonSelector;
