import "@/styles/globals.css";
import { Noto_Sans_JP } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { Viewport } from "next";
import QueryProvider from "@/providers/QueryProvider";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserFromSession } from "@/lib/getUserAction";
import ProgressBarProvider from "@/providers/ProgressBarProvider";

const font = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Anime Collector",
    template: "%s | Anime Collector",
  },
  description: "在 Anime Collector 建立你的動畫收藏清單並追蹤社群的追番動態。",
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
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => getUserFromSession(),
  });

  return (
    <html lang="zh-tw" suppressHydrationWarning>
      <body
        className={`${font.className} min-h-[100dvh] overflow-y-scroll bg-zinc-300 bg-gradient-to-br from-pink-100 text-zinc-900 dark:bg-zinc-900 dark:from-rose-950 dark:text-zinc-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <ProgressBarProvider>{children}</ProgressBarProvider>
              <Analytics />
            </HydrationBoundary>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
