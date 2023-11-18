"use client";
import * as React from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-around h-8">
      <button
        onClick={(e) => {
          setTheme("light");
          e.stopPropagation();
        }}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </button>
      <button
        onClick={(e) => {
          setTheme("dark");
          e.stopPropagation();
        }}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </button>
      <button
        onClick={(e) => {
          setTheme("system");
          e.stopPropagation();
        }}
      >
        <SunMoon className="h-[1.2rem] w-[1.2rem]" />
      </button>
    </div>
  );
};

export default ThemeToggle;
