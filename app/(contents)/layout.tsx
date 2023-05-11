import "../globals.css";
import NextAuthSessionProvider from "@/components/NextAuthSessionProvider";
import Navbar from "@/components/Navbar/Navbar";
import { getCurrentUser } from "@/app/api/collection/route";
import { ReduxProvider } from "@/app/redux/ReduxProvider";
import ReduxPreloader from "@/app/redux/ReduxPreloader";
import { store } from "../redux/store";
import { userAuthenticated } from "../redux/features/user/userSlice";
import { Analytics } from "@vercel/analytics/react";

export const dynamic = "force-dynamic";

export default async function ContentsLayout({ children }: { children: React.ReactNode }) {
  const userInfo = await getCurrentUser();
  if (userInfo) {
    const { username, avatar, watchedWorks, watchingWorks, followingWorks } = userInfo;
    const currentUser = { username, avatar, watchedWorks, watchingWorks, followingWorks };
    store.dispatch(userAuthenticated(currentUser));
  } else {
    store.dispatch(userAuthenticated(null));
  }

  return (
    <NextAuthSessionProvider>
      <ReduxPreloader currentUser={store.getState().user.user} />
      <ReduxProvider>
        <Navbar currentUser={store.getState().user.user} />
        {children}
        <Analytics />
      </ReduxProvider>
    </NextAuthSessionProvider>
  );
}
