import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          username: profile.login,
          image: profile.avatar_url,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          username: profile.name,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
};

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

export function filterUrl(url: any): string | undefined {
  if (typeof url !== "string") return;

  const result = url.match(
    /^https:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/g,
  );
  if (result) return url;
}

export const seasonMap: Record<string, string> = {
  winter: "冬",
  spring: "春",
  summer: "夏",
  autumn: "秋",
};

export const DEFAULT_YEAR = "2024";
export const DEFAULT_SEASON = "spring";
