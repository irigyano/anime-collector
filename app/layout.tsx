import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import { ReduxProvider } from "@/app/redux/ReduxProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { Viewport } from "next";
import { getUserFromSession } from "@/lib/utils";
import ReduxBroadcaster from "./components/ReduxBroadcaster";

const font = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Banngumi View",
    template: "%s | Banngumi View",
  },
  description: "在 Banngumi View 建立你的動畫收藏清單並追蹤社群的追番動態。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getUserFromSession();

  return (
    <html lang="zh-tw">
      <body
        className={`${font.className} bg-zinc-300 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <ReduxBroadcaster currentUser={currentUser}>
              {children}
              <Analytics />
            </ReduxBroadcaster>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
