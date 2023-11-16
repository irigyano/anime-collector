"use client";
import { UserClientSide } from "@/app/types/types";
import Link from "next/link";
import Image from "next/image";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "next-auth/react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import FormDialog from "../../FormDialog";
import LoginForm from "../../LoginForm";

type MenuModalProps = {
  currentUser?: UserClientSide | null;
  toggleModal: () => void;
};

const MenuModal = ({ currentUser, toggleModal }: MenuModalProps) => {
  return (
    <>
      {currentUser ? (
        <div className="fixed inset-0 w-full h-full z-20" onClick={toggleModal}>
          <div
            className="m-2 p-2 shadow-2xl absolute right-2 top-16 rounded-2xl w-32 bg-[#fff] text-[#0f0f0f] dark:bg-zinc-800 dark:text-[#f1f1f1]0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center">
              <div className="relative h-20 w-20">
                <Image
                  className="rounded-full"
                  alt="avatar"
                  src={currentUser.image || "/images/KEKW.webp"}
                  width={80}
                  height={80}
                />
              </div>
              <Link href={`/community/${currentUser.id}`}>
                <div className="hover:text-blue-500 hover:bg-slate-200 rounded-md duration-200 m-1">
                  @{currentUser.name}
                </div>
              </Link>
            </div>

            <div className="border m-1"></div>
            <div className="flex flex-col items-center">
              <Link href={"/"}>主頁</Link>
              <Link href={"/community"}>社群</Link>
            </div>

            <div className="border m-1"></div>

            <div className="flex justify-center items-center">
              <button
                className={`flex m-1 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 hover:opacity-80 duration-200 gap-2 `}
                onClick={() => {
                  document.documentElement.classList.remove("dark");
                }}
              >
                <MdOutlineLightMode size={24} />
              </button>

              <button
                className={`flex m-1 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 hover:opacity-80 duration-200 gap-2 `}
                onClick={() => {
                  document.documentElement.classList.add("dark");
                }}
              >
                <MdOutlineDarkMode size={24} />
              </button>
            </div>
            <div className="border m-1"></div>

            <div className="hover:text-blue-500 hover:bg-slate-200 rounded-md duration-200 m-1">
              <button className="w-full text-start" onClick={() => signOut()}>
                <div className="flex justify-center items-center">
                  <RiLogoutBoxLine size={20} />
                  <div className="mx-2">登出</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 w-full h-full z-20" onClick={toggleModal}>
          <div
            className="m-2 p-2 shadow-2xl absolute right-2 top-16 rounded-2xl w-32 bg-[#fff] text-[#0f0f0f] dark:bg-zinc-800 dark:text-[#f1f1f1]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center">
              <Link href={"/"}>首頁</Link>
              <Link href={"/community"}>社群</Link>
            </div>
            <div className="border m-1"></div>
            <div className="flex flex-col items-center">
              <FormDialog action="登入" className="m-0">
                <LoginForm />
              </FormDialog>
            </div>
            <div className="border m-1"></div>

            <div className="flex justify-center items-center">
              <button
                className={`flex m-1 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 hover:opacity-80 duration-200 gap-2 
                `}
                onClick={() => {
                  document.documentElement.classList.remove("dark");
                }}
              >
                <MdOutlineLightMode size={24} />
              </button>

              <button
                className={`flex m-1 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 hover:opacity-80 duration-200 gap-2 
                `}
                onClick={() => {
                  document.documentElement.classList.add("dark");
                }}
              >
                <MdOutlineDarkMode size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default MenuModal;
