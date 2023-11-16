import "./globals.css";
import SessionProvider from "@/app/components/NextAuthSessionProvider";
import Navbar from "@/app/components/Navbar/Navbar";
import { ReduxProvider } from "@/app/redux/ReduxProvider";
import ReduxPreloader from "@/app/redux/ReduxPreloader";
import { store } from "./redux/store";
import { userAuthenticated } from "./redux/features/user/userSlice";
import { Zen_Maru_Gothic } from "next/font/google";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "./api/auth/[...nextauth]/route";

const font = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["cyrillic"],
});

export const metadata = {
  title: {
    default: "Banngumi View",
    template: "%s | Banngumi View",
  },
  description: "AYAYA Clap",
};

export default async function ContentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (currentUser) store.dispatch(userAuthenticated(currentUser));
  } else store.dispatch(userAuthenticated(null));

  return (
    <html lang="zh-tw">
      <body
        className={`${font.className} min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] bg-gray-300 dark:bg-gray-800`}
      >
        <SessionProvider session={session}>
          <ReduxPreloader currentUser={store.getState().user.user} />
          <ReduxProvider>
            <Navbar />
            {children}
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
