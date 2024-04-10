"use client";
import { useEffect, useState } from "react";
import SeasonButton from "./SeasonButton";
import YearSelector from "./YearSelector";
import { useQueryState } from "next-usequerystate";

const SeasonSelector = ({
  workYear,
  workSeason,
}: {
  workYear: string;
  workSeason: string;
}) => {
  const [yearParam, setYearParam] = useQueryState("year");
  const [seasonParam, setSeasonParam] = useQueryState("season");
  const [selectedYear, setSelectedYear] = useState(workYear);

  useEffect(() => {
    setYearParam(workYear);
    setSeasonParam(workSeason);
  }, []);

  return (
    <nav className="flex justify-center gap-4 p-4 text-center">
      <YearSelector
        setSelectedYear={setSelectedYear}
        workYear={selectedYear}
        key={workYear}
      />
      <SeasonButton
        selectedYear={selectedYear}
        season="winter"
        workSeason={workSeason}
        hoverColor="hover:bg-winter"
        backgroundColor="bg-winter"
      />
      <SeasonButton
        selectedYear={selectedYear}
        season="spring"
        workSeason={workSeason}
        hoverColor="hover:bg-spring"
        backgroundColor="bg-spring"
      />
      <SeasonButton
        selectedYear={selectedYear}
        season="summer"
        workSeason={workSeason}
        hoverColor="hover:bg-summer"
        backgroundColor="bg-summer"
      />
      <SeasonButton
        selectedYear={selectedYear}
        season="autumn"
        workSeason={workSeason}
        hoverColor="hover:bg-autumn"
        backgroundColor="bg-autumn"
      />
    </nav>
  );
};
export default SeasonSelector;
