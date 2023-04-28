import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/components/providers/NextAuthSessionProvider";
import Navbar from "../components/Navbar/Navbar";
import getCurrentUser from "./actions/getCurrentUser";
import { User } from "@prisma/client";

const font = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["cyrillic"],
});

export const metadata = {
  title: "Banngumi View | Annict",
  description: "Keeps track of your favorite animes.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { currentUser: User | null };
}) {
  const currentUser = await getCurrentUser();
  params.currentUser = currentUser;

  return (
    <html lang="en">
      <body
        className={`bg-[#fff] text-[#0f0f0f] dark:bg-[#0f0f0f] dark:text-[#f1f1f1] ${font.className} duration-500`}
      >
        <NextAuthSessionProvider>
          {/* *@ts-expect-error Async Server Component */}
          <Navbar currentUser={currentUser} />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
