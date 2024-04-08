import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromSession } from "@/lib/utils";

type RequestBody = {
  comment: string;
  workId: number;
};

export async function GET(request: NextRequest) {
  const workId = request.nextUrl.searchParams.get("work");
  if (!workId)
    return NextResponse.json({ message: `Missing Info` }, { status: 400 });

  const comments = await prisma.comment.findMany({
    where: {
      workId: Number(workId),
    },
    include: {
      user: true,
    },
  });
  return NextResponse.json(comments);
}

export async function POST(request: NextRequest) {
  const { comment, workId }: RequestBody = await request.json();
  const currentUser = await getUserFromSession();
  if (!currentUser || !comment)
    return NextResponse.json({ message: `Missing Info` }, { status: 400 });

  const addedComment = await prisma.comment.create({
    data: {
      userId: currentUser.id,
      workId,
      comment,
    },
  });

  return NextResponse.json(addedComment);
}

export async function PUT(request: NextRequest) {}
export async function DELETE(request: NextRequest) {
  // consider Zod?
  const { commentId } = await request.json();
  const currentUser = await getUserFromSession();
  if (!currentUser || !commentId)
    return NextResponse.json({ message: `Missing Info` }, { status: 400 });

  const deletedComment = await prisma.comment.delete({
    where: { id: commentId },
  });
  return NextResponse.json(deletedComment);
}
