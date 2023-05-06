import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const font = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["cyrillic"],
});

export const metadata = {
  title: "Banngumi View | Annict.com",
  description: "輕鬆整理動畫清單",
};

export default async function IndexRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`bg-[#fff] text-[#0f0f0f] dark:bg-[#0f0f0f] dark:text-[#f1f1f1] ${font.className} duration-500`}
      >
        {children}
      </body>
    </html>
  );
}
