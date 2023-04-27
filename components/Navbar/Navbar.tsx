"use client";
import SearchInput from "./SearchInput";
import Menu from "./Menu";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useState } from "react";
import ThemeModal from "./ThemeModal";
import ProfileModal from "./ProfileModal";
import { User } from "@prisma/client";
import { signIn } from "next-auth/react";

type NavbarProps = {
  currentUser?: User | null;
};

const Navbar = ({ currentUser }: NavbarProps) => {
  const [theme, setTheme] = useState<string | null>(null);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  return (
    <>
      <nav className="flex justify-between border-b shadow-md items-center w-full z-20 fixed px-20 bg-[#f1f1f1] dark:bg-[#0f0f0f] duration-500">
        <div className="h-10 w-8 flex items-center justify-start lg:basis-1/3">
          <Link href={"/"} className="hidden lg:block">
            <Image alt="logo" src="/images/logo.png" width={40} height={40} />
          </Link>
          <Link className="hidden lg:block hover:text-blue-500" href={"/community"}>
            Community
          </Link>
        </div>
        <SearchInput />
        {/* mobile */}
        <Menu setTheme={setTheme} />
        {/* desktop */}
        <div className="hidden lg:flex basis-1/3 justify-end items-center">
          <Link
            href={"https://github.com/irigyano"}
            target="_blank"
            className="hover:text-blue-500 duration-300 h-10 w-10 m-1 flex justify-center items-center"
          >
            <BsGithub size={36} />
          </Link>

          <ThemeSwitch theme={theme} setTheme={setTheme} />
          <div className="relative h-10 w-10 m-1 flex justify-center items-center">
            <button
              className={`hover:text-blue-500 duration-300 ${
                showThemeModal ? "text-blue-500" : null
              }`}
              onClick={() => {
                setShowThemeModal(!showThemeModal);
              }}
            >
              {theme === "dark" ? (
                <MdOutlineDarkMode size={36} />
              ) : (
                <MdOutlineLightMode size={36} />
              )}
            </button>
            {showThemeModal && (
              <ThemeModal
                theme={theme}
                setTheme={setTheme}
                showThemeModal={showThemeModal}
                setShowThemeModal={setShowThemeModal}
              />
            )}
          </div>

          {currentUser ? (
            <>
              <div className="relative h-10 w-10 m-1 flex justify-center items-center">
                <button
                  onClick={() => {
                    setShowProfileModal(!showProfileModal);
                  }}
                >
                  <Image
                    className="rounded-full"
                    alt="avatar"
                    src="/images/guest_avatar.jpg"
                    width={40}
                    height={40}
                  />
                </button>
                {showProfileModal && (
                  <ProfileModal
                    currentUser={currentUser}
                    showProfileModal={showProfileModal}
                    setShowProfileModal={setShowProfileModal}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="relative h-10 w-40 m-1 flex justify-center items-center">
              <button className="basis-1/2" onClick={() => signIn()}>
                Log in
              </button>
              <Link className="basis-1/2" href={"/signup"}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
