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
        className={`min-h-screen ${font.className} duration-500
        text-[#0f0f0f] dark:text-[#f1f1f1]
        bg-4x animate-BgFloat bg-gradient-to-br dark:bg-gradient-to-bl
         from-yellow-100 from-5% via-sky-200 via-30% to-emerald-300 to-90%
         dark:from-slate-600 dark:from-10% dark:via-blue-950 dark:via-30% dark:to-zinc-600 dark:to-90%
         `}
      >
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>
    </html>
  );
}
