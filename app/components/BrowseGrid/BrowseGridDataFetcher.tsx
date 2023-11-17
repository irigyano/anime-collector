import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { WorkData } from "@/app/types/types";
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
  const endpoint = workTitle
    ? `${process.env.HOST_URL}/api/search/title?title=${workTitle}`
    : `${process.env.HOST_URL}/api/search/season?year=${workYear}&season=${workSeason}`;
  const res = await fetch(endpoint);
  const workData: WorkData[] = await res.json();

  const session = await getServerSession(authOptions);
  let currentUser = null;
  if (session?.user) {
    currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
  }

  return (
    <>
      {workData && (
        <main>
          <BrowseGrid
            currentUser={currentUser}
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
