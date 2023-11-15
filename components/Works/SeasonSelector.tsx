"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import SeasonButton from "./SeasonButton";
import YearSelector from "./YearSelector";

const SeasonSelector = () => {
  const searchParams = useSearchParams();
  const workYear = searchParams.get("year") || "2024";

  const [selectedYear, setSelectedYear] = useState(workYear);

  return (
    <nav className="flex justify-center gap-4 m-2">
      <YearSelector setSelectedYear={setSelectedYear} workYear={workYear} />
      <SeasonButton season="冬" selectedYear={selectedYear} />
      <SeasonButton season="春" selectedYear={selectedYear} />
      <SeasonButton season="夏" selectedYear={selectedYear} />
      <SeasonButton season="秋" selectedYear={selectedYear} />
    </nav>
  );
};
export default SeasonSelector;
