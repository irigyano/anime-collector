import Image from "next/image";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { WorkData } from "@/app/types/types";
import BrowseRow from "@/app/components/BrowseGrid/BrowseRow";

type ServerProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: ServerProps): Promise<Metadata> {
  // does prisma fetch twice or cached?
  const user = await prisma.user
    .findUnique({
      where: { id: params.id },
    })
    .catch();

  return { title: `${user?.name || "WHOMEGALUL"}` };
}

function filterApiCollections(
  apiCollections: WorkData[],
  userCollectionIds: number[]
) {
  const userCollections: WorkData[] = [];
  for (let work of apiCollections) {
    if (userCollectionIds.includes(work.annictId)) userCollections.push(work);
  }
  return userCollections;
}

const UserPage = async ({ params }: ServerProps) => {
  const user = await prisma.user
    .findUnique({
      where: { id: `${params.id}` },
    })
    .catch();
  if (!user) return redirect("/user");

  const requestingWorks = user.watchedWorks
    .concat(user.watchingWorks, user.followingWorks)
    .join(",");
  const res = await fetch(
    `${process.env.HOST_URL}/api/search/id?id=${requestingWorks}`
  );
  const works = await res.json();

  const userWatchingCollection = filterApiCollections(
    works,
    user.watchingWorks
  );
  const userWatchedCollection = filterApiCollections(works, user.watchedWorks);
  const userFollowingCollection = filterApiCollections(
    works,
    user.followingWorks
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-2 mx-4">
        <Image
          className="rounded-full"
          src={user.image || "/images/KEKW.webp"}
          width={150}
          height={150}
          sizes="150px"
          alt="avatar"
        />
        <div>@{user.name}</div>
      </div>
      <BrowseRow
        works={userWatchingCollection}
        title="正在追"
        currentUser={user}
      />
      <BrowseRow
        works={userWatchedCollection}
        title="看過"
        currentUser={user}
      />
      <BrowseRow
        works={userFollowingCollection}
        title="關注"
        currentUser={user}
      />
    </>
  );
};
export default UserPage;
