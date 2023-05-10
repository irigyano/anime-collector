import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";

type category = "watchedWorks" | "watchingWorks" | "followingWorks";

type reqAction = {
  category: category;
  annictId: number;
};

function removeCollectionState(staleArray: number[], annictId: number) {
  const filteredArray = [...staleArray];

  if (filteredArray.indexOf(annictId) !== -1) {
    filteredArray.splice(filteredArray.indexOf(annictId), 1);
  }
  return filteredArray;
}

export async function POST(request: Request) {
  const { category, annictId }: reqAction = await request.json();
  const currentUser = await getCurrentUser();

  if (!currentUser || !annictId || !category) {
    return NextResponse.json({ message: `Missing Info` }, { status: 400 });
  }

  let staleCategory_1: category;
  let staleCategory_2: category;

  switch (category) {
    case "watchedWorks":
      staleCategory_1 = "watchingWorks";
      staleCategory_2 = "followingWorks";
      break;
    case "watchingWorks":
      staleCategory_1 = "followingWorks";
      staleCategory_2 = "watchedWorks";
      break;
    case "followingWorks":
      staleCategory_1 = "watchedWorks";
      staleCategory_2 = "watchingWorks";
      break;
  }

  const filteredArray_1 = removeCollectionState([...currentUser[staleCategory_1]], annictId);
  const filteredArray_2 = removeCollectionState([...currentUser[staleCategory_2]], annictId);

  const updatedWorks = [...currentUser[category]];
  updatedWorks.push(Number(annictId));

  const { watchedWorks, watchingWorks, followingWorks } = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      // https://stackoverflow.com/questions/33194138/template-string-as-object-property-name
      // Wrapped in an array so coercion evaluate it to a string.
      [category]: updatedWorks,
      [staleCategory_1]: filteredArray_1,
      [staleCategory_2]: filteredArray_2,
    },
  });

  return NextResponse.json({ watchedWorks, watchingWorks, followingWorks });
}

export async function PUT(request: Request) {
  const { category, annictId }: reqAction = await request.json();
  const currentUser = await getCurrentUser();

  if (!currentUser || !annictId || !category) {
    return NextResponse.json({ message: `Missing Info` }, { status: 400 });
  }

  const updatedWorks = [...currentUser[category]].filter((work) => {
    return work !== Number(annictId);
  });

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      [category]: updatedWorks,
    },
  });

  return NextResponse.json({ message: `DELETE to ${annictId} success!` }, { status: 200 });
}
