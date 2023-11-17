import "./globals.css";
import { Zen_Maru_Gothic } from "next/font/google";
import { ReduxProvider } from "@/app/redux/ReduxProvider";
import Navbar from "@/app/components/Navbar/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";

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

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <html lang="zh-tw">
        <body
          className={`${font.className} min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] bg-gray-300 dark:bg-gray-800`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ReduxProvider>
  );
}
