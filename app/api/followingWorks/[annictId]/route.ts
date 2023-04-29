import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request, { params }: { params: { annictId: string } }) {
  const currentUser = await getCurrentUser();
  const { annictId } = params;

  if (!currentUser || !annictId) {
    return NextResponse.error();
  }

  const updatingWorks = [...currentUser.followingWorks];
  updatingWorks.push(Number(annictId));

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      followingWorks: updatingWorks,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: { annictId: string } }) {
  const currentUser = await getCurrentUser();
  const { annictId } = params;

  if (!currentUser || !annictId) {
    return NextResponse.error();
  }

  const updatingWorks = [...currentUser.followingWorks].filter((work) => {
    return work !== Number(annictId);
  });

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      followingWorks: updatingWorks,
    },
  });

  return NextResponse.json(user);
}
