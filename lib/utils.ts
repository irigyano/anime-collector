import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUserFromSession() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const currentUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  return currentUser;
}
