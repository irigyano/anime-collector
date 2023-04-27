"use client";
import { SetStateAction } from "react";

import { useEffect } from "react";

const ThemeSwitch = ({
  theme,
  setTheme,
}: {
  theme: string | null;
  setTheme: React.Dispatch<SetStateAction<string | null>>;
}) => {
  // Getting data on client side
  // https://stackoverflow.com/questions/75692116/next-js-13-window-is-not-defined
  useEffect(() => {
    setTheme(localStorage.getItem("theme") ? localStorage.getItem("theme") : "system");
    window
      .matchMedia("(prefers-color-scheme:dark)")
      .addEventListener("change", (e: MediaQueryListEvent) => {
        // using system default setting
        if (!("theme" in localStorage)) {
          if (e.matches) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      });
  }, []);

  useEffect(() => {
    function onWindowMatch() {
      if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      localStorage.removeItem("theme");
      onWindowMatch();
    }
  }, [theme]);

  return <div></div>;
};
export default ThemeSwitch;
