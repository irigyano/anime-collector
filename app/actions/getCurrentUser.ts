import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// export async function getSession() {
//   return await getServerSession(authOptions);
// }

export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        username: session.user.name as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
