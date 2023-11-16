import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

type category = "watchedWorks" | "watchingWorks" | "followingWorks";

type reqAction = {
  category: category;
  annictId: number;
};

async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  return user;
}

function filterRepeatedCollection(works: number[], workId: number) {
  if (works.indexOf(workId) !== -1) works.splice(works.indexOf(workId), 1);
}

export async function POST(request: Request) {
  const { category, annictId }: reqAction = await request.json();
  const currentUser = await getCurrentUser();
  if (!currentUser || !annictId || !category) {
    return NextResponse.json({ message: `Missing Info` }, { status: 400 });
  }

  filterRepeatedCollection(currentUser.watchedWorks, annictId);
  filterRepeatedCollection(currentUser.watchingWorks, annictId);
  filterRepeatedCollection(currentUser.followingWorks, annictId);
  currentUser[category].push(annictId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      watchedWorks: currentUser.watchedWorks,
      watchingWorks: currentUser.watchingWorks,
      followingWorks: currentUser.followingWorks,
    },
    select: {
      id: true,
      image: true,
      watchedWorks: true,
      watchingWorks: true,
      followingWorks: true,
    },
  });
  return NextResponse.json(user);
}

export async function DELETE(request: Request) {
  const { category, annictId }: reqAction = await request.json();
  const currentUser = await getCurrentUser();
  if (!currentUser || !annictId || !category) {
    return NextResponse.json({ message: `Missing Info` }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      [category]: currentUser[category].filter(
        (work) => work !== Number(annictId)
      ),
    },
    select: {
      id: true,
      image: true,
      watchedWorks: true,
      watchingWorks: true,
      followingWorks: true,
    },
  });
  return NextResponse.json(user);
}
