"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Redirector = () => {
  const router = useRouter();

  useEffect(() => {
    // default to current season
    router.replace("?year=2024&season=winter");
  }, []);

  return <></>;
};

export default Redirector;
