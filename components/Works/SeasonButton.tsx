"use client";

import { useRouter } from "next/navigation";

const seasonMap: any = {
  winter: "冬",
  spring: "春",
  summer: "夏",
  autumn: "秋",
};

const SeasonButton = ({
  selectedYear,
  season,
  workSeason,
  hoverColor,
  backgroundColor,
}: {
  selectedYear: string;
  season: string;
  workSeason: string;
  hoverColor: string;
  backgroundColor: string;
}) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(`?year=${selectedYear}&season=${season}`);
      }}
      className={`border-2 rounded-full w-7 h-7 duration-500  border-${season} ${hoverColor} ${
        workSeason === season && backgroundColor
      }
      }`}
    >
      {seasonMap[season]}
    </button>
  );
};

export default SeasonButton;
