"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MiniPage from "@/components/Works/MiniPage";
import LoadingSpinner from "@/components/LoadingSpinner";

const fetchData = async (title: string | null) => {
  const response = await fetch(`/api/search/titles?title=${title}`);
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
  }, [title]);

  if (!worksData) {
    return <LoadingSpinner />;
  }

  if (worksData && worksData.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen pb-40 text-xl lg:text-3xl text-center">
        <div>結果が見つかりませんでした。</div>
        <div>かなを使って検索してみてください。</div>
        <div>例えば、「進撃の巨人」または「ソードアート・オンライン」。</div>
      </div>
    );
  }
  return <MiniPage worksData={worksData} mode="search" />;
};
export default SearchPage;
