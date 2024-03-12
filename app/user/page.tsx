import Image from "next/image";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { WorkData } from "@/app/types/types";
import { getUserFromSession } from "@/lib/utils";
import WorkGrid from "@/app/components/WorkGrid/WorkGrid";
import ClientAvatar from "./ClientAvatar";

export async function generateMetadata({
  searchParams,
}: any): Promise<Metadata> {
  return { title: `${searchParams.name}` };
}

function filterCollection(
  apiCollection: WorkData[],
  userCollectionIds: number[],
) {
  const userCollection: WorkData[] = [];
  for (let work of apiCollection) {
    if (userCollectionIds.includes(work.annictId)) userCollection.push(work);
  }
  return userCollection;
}

const UserPage = async ({ searchParams }: any) => {
  const username = searchParams.name;

  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!user) redirect("/activity");

  const currentUser = await getUserFromSession();

  const requestingWorks = user.finishedWorks
    .concat(user.watchingWorks, user.followingWorks)
    .join(",");
  const res = await fetch(
    `${process.env.HOST_URL}/api/search/id?id=${requestingWorks}`,
  );
  const works: WorkData[] = await res.json();

  const userFollowingCollection = filterCollection(works, user.followingWorks);
  const userWatchingCollection = filterCollection(works, user.watchingWorks);
  const userFinishedCollection = filterCollection(works, user.finishedWorks);

  return (
    <div className="">
      <div className="mt-2 flex flex-col items-center justify-center">
        <ClientAvatar imageSrc={user.image} />
        <div>@{user.username}</div>
      </div>

      {userFollowingCollection.length !== 0 && (
        <>
          <div className="py-2 pl-4 text-2xl">追蹤的作品</div>
          <WorkGrid
            workData={userFollowingCollection}
            currentUser={currentUser}
          />
        </>
      )}
      {userWatchingCollection.length !== 0 && (
        <>
          <div className="py-2 pl-4 text-2xl">正在看的作品</div>
          <WorkGrid
            workData={userWatchingCollection}
            currentUser={currentUser}
          />
        </>
      )}
      {userFinishedCollection.length !== 0 && (
        <>
          <div className="py-2 pl-4 text-2xl">看完的作品</div>
          <WorkGrid
            workData={userFinishedCollection}
            currentUser={currentUser}
          />
        </>
      )}
    </div>
  );
};
export default UserPage;
