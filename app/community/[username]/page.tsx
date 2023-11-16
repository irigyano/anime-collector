import WorkCard from "@/app/components/Work/WorkCard";
import { WorkData } from "@/app/types/types";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { Metadata } from "next";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const username = params.username;
  return {
    title: `@${username}`,
  };
}

function findMatchingId(
  arrayA: WorkData[],
  arrayB: number[],
  arrayC: number[],
  arrayD: number[]
) {
  const matchingObjectsB = [];
  const matchingObjectsC = [];
  const matchingObjectsD = [];

  for (let i = 0; i < arrayA.length; i++) {
    const id = arrayA[i].annictId;
    if (arrayB.includes(id)) {
      matchingObjectsB.push(arrayA[i]);
    }
    if (arrayC.includes(id)) {
      matchingObjectsC.push(arrayA[i]);
    }
    if (arrayD.includes(id)) {
      matchingObjectsD.push(arrayA[i]);
    }
  }

  return [matchingObjectsB, matchingObjectsC, matchingObjectsD];
}

const UserPage = async ({ params }: { params: { username: string } }) => {
  // potential leak?
  const user = await prisma.user.findUnique({
    where: { id: `${params.username}` },
  });

  if (!user) {
    return <div>找不到使用者</div>;
  }

  let requestingWorks = user.watchedWorks
    .concat(user.watchingWorks, user.followingWorks)
    .map((workId: number) => `${workId},`)
    .join("");

  async function fetchData(Ids: string) {
    const { data } = await (
      await fetch("https://api.annict.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ANNICT_TOKEN}`,
        },
        body: JSON.stringify({
          query: `query {
              searchWorks(
                annictIds:[${Ids}]
                orderBy: { field: WATCHERS_COUNT, direction: DESC }
              ) {
                nodes {
                  annictId
                  title
                  titleKana
                  seasonName
                  seasonYear
                  media
                  twitterHashtag
                  episodesCount
                  image{facebookOgImageUrl,recommendedImageUrl}         
                  casts(first:5){nodes{name,person{annictId},character{name,annictId}}}
                }
              }
            }`,
        }),
        cache: "force-cache",
      })
    ).json();
    const results = data.searchWorks.nodes;
    return results;
  }

  const works = await fetchData(requestingWorks);

  const resultData = findMatchingId(
    works,
    user.watchedWorks,
    user.watchingWorks,
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
      <div className="my-3">
        <div className="flex justify-center items-center text-center">
          <div className="text-xl rounded-lg bg-gray-100 dark:bg-zinc-800 w-48 opacity-70 my-2">
            正在看的作品：{resultData[1].length}
          </div>
        </div>
        <section className="flex lg:flex-wrap lg:overflow-visible lg:justify-center overflow-x-auto">
          {resultData[1].map((work: WorkData) => {
            return (
              <div key={work.annictId}>
                <WorkCard work={work} />
              </div>
            );
          })}
        </section>
      </div>
      <div className="my-3">
        <div className="flex justify-center items-center text-center">
          <div className="text-xl rounded-lg bg-gray-100 dark:bg-zinc-800 w-48 opacity-70 my-2">
            看過的作品：{resultData[0].length}
          </div>
        </div>
        <section className="flex lg:flex-wrap lg:overflow-visible lg:justify-center overflow-x-auto">
          {resultData[0].map((work: WorkData) => {
            return (
              <div key={work.annictId}>
                <WorkCard work={work} />
              </div>
            );
          })}
        </section>
      </div>
      <div className="my-3">
        <div className="flex justify-center items-center text-center">
          <div className="text-xl rounded-lg bg-gray-100 dark:bg-zinc-800 w-48 opacity-70 my-2">
            關注的作品：{resultData[2].length}
          </div>
        </div>
        <section className="flex lg:flex-wrap lg:overflow-visible lg:justify-center overflow-x-auto">
          {resultData[2].map((work: WorkData) => {
            return (
              <div key={work.annictId}>
                <WorkCard work={work} />
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};
export default UserPage;
