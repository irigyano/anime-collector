import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

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
export const DEFAULT_SEASON = "winter";

export const IMAGE_PLACEHOLDER =
  "data:image/webp;base64,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";
