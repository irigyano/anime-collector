"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { UserClientSide } from "@/app/types/types";

const ProfileDropdown = ({ currentUser }: { currentUser: UserClientSide }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          className="rounded-full"
          alt="avatar"
          src={currentUser.image || "/images/KEKW.webp"}
          width={40}
          height={40}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Link href={`/community/${currentUser.id}`}>
            <div className="hover:text-blue-500 hover:bg-slate-200 rounded-md duration-200 m-1">
              @{currentUser.name}
            </div>
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="w-full text-start" onClick={() => signOut()}>
            <div className="flex justify-center items-center">
              <RiLogoutBoxLine size={20} />
              <div className="mx-2">登出</div>
            </div>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
