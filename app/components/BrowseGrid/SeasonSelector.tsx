"use client";

import { useState } from "react";
import SeasonButton from "./SeasonButton";
import YearSelector from "./YearSelector";

const SeasonSelector = ({
  workYear,
  workSeason,
}: {
  workYear: string;
  workSeason: string;
}) => {
  const [selectedYear, setSelectedYear] = useState(workYear);

  return (
    <nav className="flex justify-center gap-4 m-2 text-center">
      <YearSelector setSelectedYear={setSelectedYear} workYear={selectedYear} />
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
