import { SetStateAction } from "react";
import LogOutButton from "./LogOutButton";
import { User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

type ProfileModalProps = {
  currentUser: User;
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
        <div className="fixed w-40 top-16 right-20 opacity-90 bg-gray-100 dark:bg-slate-900 rounded-lg overflow-hidden">
          <Image
            className="rounded-full"
            alt="avatar"
            src="/images/guest_avatar.jpg"
            width={40}
            height={40}
          />
          <Link href={`/community/${currentUser.username}`}>
            <div className="hover:text-blue-500 hover:bg-slate-200 rounded-md duration-200 m-1">
              @{currentUser.username}
            </div>
            <div className="border border-blue-500" />
          </Link>
          <div className="hover:text-blue-500 hover:bg-slate-200 rounded-md duration-200 m-1">
            <LogOutButton />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileModal;
