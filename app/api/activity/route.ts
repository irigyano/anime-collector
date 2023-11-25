import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Action } from "@prisma/client";
import { getUserFromSession } from "@/lib/utils";

const actionMap: Record<string, Action> = {
  followingWorks: "FOLLOW",
  watchingWorks: "WATCH",
  finishedWorks: "FINISH",
};
type category = "followingWorks" | "watchingWorks" | "finishedWorks";

type RequestBody = {
  action?: "COMMENT";
  category?: category;
  annictId: number;
  workTitle: string;
};

export async function POST(request: Request) {
  const { action, category, annictId, workTitle }: RequestBody =
    await request.json();
  const currentUser = await getUserFromSession();
  if (!currentUser || !annictId || !workTitle)
    return NextResponse.json({ message: `Missing Info` }, { status: 400 });

  const activity = await prisma.activity.create({
    data: {
      userId: currentUser.id,
      workId: annictId,
      workTitle,
      action: action || actionMap[category!],
    },
  });

  return NextResponse.json(activity);
}
