import "./globals.css";
import NextAuthSessionProvider from "@/components/NextAuthSessionProvider";
import Navbar from "@/components/Navbar/Navbar";
import { getCurrentUser } from "@/app/api/collection/route";
import { ReduxProvider } from "@/app/redux/ReduxProvider";
import ReduxPreloader from "@/app/redux/ReduxPreloader";
import { store } from "./redux/store";
import { userAuthenticated } from "./redux/features/user/userSlice";
import { Zen_Maru_Gothic } from "next/font/google";

// figure out this when building
// export const dynamic = "force-dynamic";

const font = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["cyrillic"],
});

export const metadata = {
  title: {
    default: "Banngumi View | Annict.com",
    template: "%s | Banngumi View | Annict.com",
  },
  description: "Share Your Anime Collection with Friends.",
};

export default async function ContentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = await getCurrentUser();
  if (userInfo) {
    const { username, avatar, watchedWorks, watchingWorks, followingWorks } =
      userInfo;
    const currentUser = {
      username,
      avatar,
      watchedWorks,
      watchingWorks,
      followingWorks,
    };
    store.dispatch(userAuthenticated(currentUser));
  } else {
    store.dispatch(userAuthenticated(null));
  }

  return (
    <html lang="zh-tw">
      <body
        className={`${font.className} min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] bg-gray-300 dark:bg-gray-800`}
      >
        <NextAuthSessionProvider>
          <ReduxPreloader currentUser={store.getState().user.user} />
          <ReduxProvider>
            <Navbar currentUser={store.getState().user.user} />
            {children}
          </ReduxProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
