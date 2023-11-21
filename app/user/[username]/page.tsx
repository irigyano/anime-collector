import Image from "next/image";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ServerProps, WorkData } from "@/app/types/types";
import { getUserFromSession } from "@/lib/utils";
import WorkGrid from "@/app/components/BrowseGrid/WorkGrid";

export async function generateMetadata({
  params,
}: ServerProps): Promise<Metadata> {
  return { title: `${params.username}` };
}

function filterCollection(
  apiCollection: WorkData[],
  userCollectionIds: number[]
) {
  const userCollection: WorkData[] = [];
  for (let work of apiCollection) {
    if (userCollectionIds.includes(work.annictId)) userCollection.push(work);
  }
  return userCollection;
}

const UserPage = async ({ params }: ServerProps) => {
  let user = null;
  try {
    user = await prisma.user.findUnique({
      where: { username: params.username },
    });
    if (!user) return redirect("/activity");
  } catch (error) {
    console.log(error);
    return redirect("/activity");
  }

  const currentUser = await getUserFromSession();

  const requestingWorks = user.finishedWorks
    .concat(user.watchingWorks, user.followingWorks)
    .join(",");
  const res = await fetch(
    `${process.env.HOST_URL}/api/search/id?id=${requestingWorks}`
  );
  const works: WorkData[] = await res.json();

  const userFollowingCollection = filterCollection(works, user.followingWorks);
  const userWatchingCollection = filterCollection(works, user.watchingWorks);
  const userFinishedCollection = filterCollection(works, user.finishedWorks);

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center mt-2">
        <Image
          className="rounded-full"
          src={user.image || "/images/KEKW.webp"}
          width={150}
          height={150}
          sizes="150px"
          alt="avatar"
        />
        <div>@{user.username}</div>
      </div>

      {userFollowingCollection.length !== 0 && (
        <>
          <div className="text-2xl pl-4 py-2">追蹤的作品</div>
          <WorkGrid
            workData={userFollowingCollection}
            currentUser={currentUser}
          />
        </>
      )}
      {userWatchingCollection.length !== 0 && (
        <>
          <div className="text-2xl pl-4 py-2">正在看的作品</div>
          <WorkGrid
            workData={userWatchingCollection}
            currentUser={currentUser}
          />
        </>
      )}
      {userFinishedCollection.length !== 0 && (
        <>
          <div className="text-2xl pl-4 py-2">看完的作品</div>
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
