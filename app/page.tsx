"use client";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import BrowseGrid from "@/app/components/BrowseGrid/BrowseGrid";
import SeasonSelector from "@/app/components/BrowseGrid/SeasonSelector";
import { WorkData } from "@/app/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const HomePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const workYear = searchParams.get("year") || "2023";
  const workSeason = searchParams.get("season") || "autumn";
  const workTitle = searchParams.get("title");

  const [workData, setWorkData] = useState<WorkData[] | null>(null);

  useEffect(() => {
    if (workTitle) {
      fetch(`/api/search/titles?title=${workTitle}`)
        .then((res) => res.json())
        .then((res) => {
          setWorkData(res);
          router.replace(`?title=${workTitle}`);
        });
    } else if (workYear && workSeason) {
      fetch(`/api/search/seasons?year=${workYear}&season=${workSeason}`)
        .then((res) => res.json())
        .then((res) => {
          setWorkData(res);
          router.replace(`?year=${workYear}&season=${workSeason}`);
        });
    }

    return setWorkData(null);
  }, [workYear, workSeason, workTitle]);

  return (
    <>
      {!workData ? (
        <LoadingSpinner />
      ) : (
        <main>
          {!workTitle && (
            <SeasonSelector workYear={workYear} workSeason={workSeason} />
          )}
          <BrowseGrid workData={workData} />
        </main>
      )}
    </>
  );
};

export default HomePage;
