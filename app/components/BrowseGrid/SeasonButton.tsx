"use client";
import Link from "next/link";

const seasonMap: Record<string, string> = {
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
  return (
    <Link
      href={`/?year=${selectedYear}&season=${season}`}
      className={`border-2 rounded-full w-7 h-7 duration-500 border-${season} ${hoverColor} ${
        workSeason === season ? backgroundColor : ""
      }`}
    >
      {seasonMap[season]}
    </Link>
  );
};

export default SeasonButton;
