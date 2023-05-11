import { Zen_Maru_Gothic } from "next/font/google";
import NextAuthSessionProvider from "@/components/NextAuthSessionProvider";
import "./globals.css";

const font = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["cyrillic"],
});

export const metadata = {
  title: { default: "Banngumi View | Annict.com", template: "%s | Banngumi View | Annict.com" },
  description: "Share Your Anime Collection with Friends.",
};

export default async function IndexRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`bg-[#fff] text-[#0f0f0f] dark:bg-[#0f0f0f] dark:text-[#f1f1f1] ${font.className} duration-500`}
      >
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>
    </html>
  );
}
