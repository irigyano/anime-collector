import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  // const addingWatchedWork = async (currentUser: User, annictId: number) => {
  // if (!currentUser) {
  //   console.log("please log in");
  //   return;
  // }

  // currentUser.watchedWorks.push({ annictId: annictId, rating: 5, comment: "this is a test" });

  await prisma.user.update({
    where: {
      username: "user",
    },
    data: {
      watchedWorks: [1],
      watchingWorks: [9676],
      followingWorks: [9328],
    },
  });

  console.log("adding");
}
