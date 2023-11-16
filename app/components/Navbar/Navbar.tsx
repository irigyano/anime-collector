"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "./SearchInput";
import MobileMenu from "./MobileMenu/MobileMenu";
import ProfileModal from "./ProfileModal";
import { BsGithub } from "react-icons/bs";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import LoginForm from "../LoginForm";
import FormDialog from "../FormDialog";

const Navbar = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const currentUser = useAppSelector((state) => state.user.user);
  return (
    <>
      <nav className="flex justify-center lg:justify-between lg:px-20 border-b shadow-md items-center w-full z-20 fixed bg-[#f1f1f1] dark:bg-[#0f0f0f] duration-500">
        <div className="h-10 flex items-center justify-start basis-1/3">
          <div className="hidden lg:block m-1 hover:border-b-2 border-transparent duration-100">
            <Link href={"/"} className="lg:block">
              <Image alt="logo" src="/favicon.ico" width={40} height={40} />
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="h-8 w-20 m-1 justify-center items-center flex">
              <Link
                className="hidden lg:block hover:text-blue-500 duration-300"
                href={"/community"}
              >
                社群
              </Link>
            </div>
          </div>
          <div className="h-8 w-20 m-1 justify-center items-center flex">
            <Link
              className="hidden lg:block hover:text-blue-500 duration-300"
              target="_blank"
              href={"https://annict.com/"}
            >
              Annict.com
            </Link>
          </div>
        </div>
        <SearchInput />
        {/* mobile */}
        <MobileMenu currentUser={currentUser} />
        {/* desktop */}
        <div className="hidden lg:flex basis-1/3 justify-end items-center">
          <Link
            href={"https://github.com/irigyano/Banngumi-View"}
            target="_blank"
            className="hover:text-blue-500 duration-300 h-10 w-10 m-1 flex justify-center items-center"
          >
            <BsGithub size={36} />
          </Link>

          <div className="h-10 w-10 m-1 flex justify-center items-center">
            {isDarkMode ? (
              <MdOutlineDarkMode
                size={36}
                onClick={() => {
                  setIsDarkMode(!isDarkMode);
                  document.documentElement.classList.remove("dark");
                }}
              />
            ) : (
              <MdOutlineLightMode
                size={36}
                onClick={() => {
                  setIsDarkMode(!isDarkMode);
                  document.documentElement.classList.add("dark");
                }}
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
                    src={currentUser.image || "/images/KEKW.webp"}
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
            <div className="h-10 w-40 flex text-center justify-center items-center">
              <FormDialog
                className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-500 rounded-lg shadow-md"
                action="登入"
              >
                <LoginForm />
              </FormDialog>
            </div>
          )}
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
