import BrowseGrid from "@/app/components/BrowseGrid/BrowseGrid";

const BrowseGridDataFetcher = async ({
  workYear,
  workSeason,
  workTitle,
}: {
  workYear: string;
  workSeason: string;
  workTitle: string;
}) => {
  let workData = null;

  if (workTitle) {
    const res = await fetch(
      `${process.env.HOST_URL}/api/search/titles?title=${workTitle}`
    );
    workData = await res.json();
  } else {
    const res = await fetch(
      `${process.env.HOST_URL}/api/search/seasons?year=${workYear}&season=${workSeason}`
    );
    workData = await res.json();
  }

  return (
    <>
      {workData && (
        <main>
          <BrowseGrid
            workData={workData}
            workYear={workYear}
            workSeason={workSeason}
            workTitle={workTitle}
          />
        </main>
      )}
    </>
  );
};

export default BrowseGridDataFetcher;
