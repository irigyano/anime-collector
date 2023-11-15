"use client";

import { useRouter, useSearchParams } from "next/navigation";

const seasonMap: any = {
  冬: "winter",
  春: "spring",
  夏: "summer",
  秋: "autumn",
};

const SeasonButton = ({
  season,
  selectedYear,
}: {
  season: string;
  selectedYear: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workSeason = searchParams.get("season");

  const buttonSeason = seasonMap[season];

  console.log(buttonSeason, buttonSeason === workSeason);

  return (
    <button
      onClick={() => {
        router.push(`?year=${selectedYear}&season=${buttonSeason}`);
      }}
      className={`border-2 rounded-full w-7 h-7 duration-500 hover:bg-${buttonSeason} border-${buttonSeason} ${
        buttonSeason === `${workSeason}` ? `bg-${buttonSeason}` : ""
      }`}
    >
      {season}
    </button>
  );
};

export default SeasonButton;
