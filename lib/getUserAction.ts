"use server";

import { getServerSession } from "next-auth";
import prisma from "./prisma";
import { authOptions } from "./utils";

export async function getUserFromSession() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const currentUser = prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      username: true,
      image: true,
      followingWorks: true,
      watchingWorks: true,
      finishedWorks: true,
    },
  });

  return currentUser;
}
