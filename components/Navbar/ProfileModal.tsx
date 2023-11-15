"use client";
import { SetStateAction } from "react";
import { UserClientSide } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "next-auth/react";

type ProfileModalProps = {
  currentUser: UserClientSide;
  showProfileModal: boolean;
  setShowProfileModal: React.Dispatch<SetStateAction<boolean>>;
};

const ProfileModal = ({
  currentUser,
  showProfileModal,
  setShowProfileModal,
}: ProfileModalProps) => {
  return (
    <div
      className="top-0 left-0 z-20 fixed w-screen h-screen"
      onClick={() => {
        setShowProfileModal(!showProfileModal);
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="fixed w-40 top-16 right-20 shadow-lg bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden flex flex-col justify-center px-3 py-1">
          <div className="flex flex-col items-center">
            <div className="relative h-20 w-20">
              <Image
                className="rounded-full"
                alt="avatar"
                src="/images/default_avatar.png"
                fill
              />
            </div>
            <Link href={`/community/${currentUser.username}`}>
              <div className="hover:text-blue-500 hover:bg-slate-200 rounded-md duration-200 m-1">
                @{currentUser.username}
              </div>
            </Link>
          </div>
          <div className="my-1 border" />
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
    </div>
  );
};
export default ProfileModal;
