"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const HomeIcon = () => {
  const searchParams = useSearchParams();
  const workYear = searchParams.get("year");
  const workSeason = searchParams.get("season");
  const homeUrl = `?year=${workYear}&season=${workSeason}`;

  return (
    <Link
      href={workYear && workSeason ? homeUrl : "/"}
      className="hidden lg:block hover:border-b-2 border-transparent"
    >
      <Image
        className="rounded-full"
        alt="logo"
        src={"/images/GWEN.webp"}
        width={40}
        height={40}
      />
    </Link>
  );
};

export default HomeIcon;
