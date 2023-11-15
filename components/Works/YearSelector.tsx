const YearSelector = ({
  setSelectedYear,
  workYear,
}: {
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  workYear: string;
}) => {
  const yearSelection: number[] = [];

  for (let y = 2024; y > 1994; y--) {
    yearSelection.push(y);
  }

  return (
    <select
      onChange={(e) => {
        setSelectedYear(e.target.value);
      }}
      size={1}
      className="border rounded-xl px-1 bg-[#fff] dark:bg-[#0f0f0f]"
      defaultValue={workYear}
    >
      {yearSelection.map((year) => {
        return (
          <option key={year} value={year}>
            {year}
          </option>
        );
      })}
    </select>
  );
};

export default YearSelector;
