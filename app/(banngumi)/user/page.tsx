import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import WorkGrid from "@/components/WorkGrid/WorkGrid";
import ClientAvatar from "@/components/ClientAvatar";
import type { Work } from "@/types/work";

export async function generateMetadata({
  searchParams,
}: any): Promise<Metadata> {
  return { title: `${searchParams.name}` };
}

function filterCollection(apiCollection: Work[], userCollectionIds: number[]) {
  const userCollection: Work[] = [];
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

  const requestingWorks = user.finishedWorks
    .concat(user.watchingWorks, user.followingWorks)
    .join(",");
  const res = await fetch(
    `${process.env.HOST_URL}/api/search/id?id=${requestingWorks}`,
  );
  const works: Work[] = await res.json();

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
          <WorkGrid workData={userFollowingCollection} />
        </>
      )}
      {userWatchingCollection.length !== 0 && (
        <>
          <div className="py-2 pl-4 text-2xl">正在看的作品</div>
          <WorkGrid workData={userWatchingCollection} />
        </>
      )}
      {userFinishedCollection.length !== 0 && (
        <>
          <div className="py-2 pl-4 text-2xl">看完的作品</div>
          <WorkGrid workData={userFinishedCollection} />
        </>
      )}
    </div>
  );
};
export default UserPage;
