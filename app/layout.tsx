import "./globals.css";
import { Zen_Maru_Gothic } from "next/font/google";
import { ReduxProvider } from "@/app/redux/ReduxProvider";
import Navbar from "@/app/components/Navbar/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { Viewport } from "next";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <html lang="zh-tw" suppressHydrationWarning>
        <body
          className={`${font.className} text-zinc-900 dark:text-zinc-300 bg-zinc-300 dark:bg-zinc-900`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ReduxProvider>
  );
}
