"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const HomeLink = ({ children }: { children?: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const workYear = searchParams.get("year");
  const workSeason = searchParams.get("season");
  const homeUrl = `?year=${workYear}&season=${workSeason}`;

  return (
    <Link href={workYear && workSeason ? homeUrl : "/"} className="">
      {children}
    </Link>
  );
};

export default HomeLink;
