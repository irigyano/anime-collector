"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import MiniPage from "@/components/Works/MiniPage";

const fetchData = async (title: string | null) => {
  const response = await fetch(
    `/api/search/titles?title=${title}`,
    // `/api/test/data?title=${title}`,
    { cache: "no-store" }
  );
  return response.json();
};

const SearchPage = () => {
  const [worksData, setWorksData] = useState<[] | null>(null);
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  useEffect(() => {
    fetchData(title).then((data) => {
      setWorksData(data);
    });
  }, []);

  if (!worksData) {
    return <Loading />;
  }

  if (worksData && worksData.length === 0) {
    return <h1>No Result.</h1>;
  }

  return <MiniPage worksData={worksData} mode="search" />;
};
export default SearchPage;
