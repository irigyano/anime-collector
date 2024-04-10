"use client";
import { seasonMap } from "@/lib/utils";
import Link from "next/link";

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
      href={`/home?year=${selectedYear}&season=${season}`}
      className={`h-7 w-7 rounded-full border-2 duration-500 border-${season} ${hoverColor} ${
        workSeason === season ? backgroundColor : ""
      }`}
    >
      {seasonMap[season]}
    </Link>
  );
};

export default SeasonButton;
