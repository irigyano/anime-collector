import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prisma";

type reqAction = {
  category: "watchedWorks" | "watchingWorks" | "followingWorks";
  annictId: number;
};

export async function POST(request: Request) {
  const { category, annictId }: reqAction = await request.json();
  const currentUser = await getCurrentUser();

  if (!currentUser || !annictId || !category) {
    return NextResponse.error();
  }

  const updatedWorks = [...currentUser[category]];
  updatedWorks.push(Number(annictId));

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      // https://stackoverflow.com/questions/33194138/template-string-as-object-property-name
      // Wrapped in an array so coercion evaluate it to a string.
      [category]: updatedWorks,
    },
  });

  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const { category, annictId }: reqAction = await request.json();
  const currentUser = await getCurrentUser();

  if (!currentUser || !annictId || !category) {
    console.log("missing somethin");
    return NextResponse.error();
  }

  const updatedWorks = [...currentUser[category]].filter((work) => {
    return work !== Number(annictId);
  });

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      [category]: updatedWorks,
    },
  });

  return NextResponse.json(user);
}
