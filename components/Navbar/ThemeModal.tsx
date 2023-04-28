"use client";

import { SetStateAction } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { CgScreen } from "react-icons/cg";

const ThemeModal = ({
  theme,
  setTheme,
  showThemeModal,
  setShowThemeModal,
}: {
  theme: string | null;
  setTheme: React.Dispatch<SetStateAction<string | null>>;
  showThemeModal: boolean;
  setShowThemeModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="top-0 left-0 z-20 fixed w-screen h-screen"
      onClick={() => {
        setShowThemeModal(!showThemeModal);
      }}
    >
      <div className="fixed gap-1 top-16 right-32 w-36 text-lg justify-start flex-col flex opacity-90 bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
        <button
          className={`flex m-1 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 hover:opacity-80 duration-200 gap-2 ${
            theme === "light" && "text-blue-500"
          }`}
          onClick={() => {
            setTheme("light");
          }}
        >
          <MdOutlineLightMode size={30} />
          Light
        </button>

        <button
          className={`flex m-1 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 hover:opacity-80 duration-200 gap-2 ${
            theme === "dark" && "text-blue-500"
          }`}
          onClick={() => {
            setTheme("dark");
          }}
        >
          <MdOutlineDarkMode size={30} />
          Dark
        </button>
        <button
          className={`flex m-1 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 hover:opacity-80 duration-200 gap-2 ${
            theme === "system" && "text-blue-500"
          }`}
          onClick={() => {
            setTheme("system");
          }}
        >
          <CgScreen size={30} />
          System
        </button>
      </div>
    </div>
  );
};
export default ThemeModal;
