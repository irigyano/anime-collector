import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { Action } from "@prisma/client";

const actionMap: Record<string, Action> = {
  followingWorks: "FOLLOW",
  watchingWorks: "WATCH",
  finishedWorks: "FINISH",
};
type category = "followingWorks" | "watchingWorks" | "finishedWorks";

type RequestBody = {
  category: category;
  annictId: number;
  workTitle: string;
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

export async function POST(request: Request) {
  const { category, annictId, workTitle }: RequestBody = await request.json();
  const currentUser = await getCurrentUser();
  if (!currentUser || !annictId || !workTitle)
    return NextResponse.json({ message: `Missing Info` }, { status: 400 });

  const activity = await prisma.activity.create({
    data: {
      userId: currentUser.id,
      workId: annictId,
      workTitle,
      action: actionMap[category],
    },
  });

  return NextResponse.json(activity);
}
