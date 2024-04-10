"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { RiLogoutBoxLine } from "react-icons/ri";
import type { User } from "@/types/user";

const ProfileDropdown = ({ currentUser }: { currentUser: User }) => {
  // since currenUser already checked from the parent component,
  // so it would not be null for sure, how to type it better without using '!'?

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          className="rounded-full"
          alt="avatar"
          src={currentUser!.image || "/images/KEKW.webp"}
          width={40}
          height={40}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "/images/KEKW.webp";
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="justify-center">
          <Link href={`/user/?name=${currentUser!.username}`}>
            @{currentUser!.username}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="w-full text-start" onClick={() => signOut()}>
            <div className="flex items-center justify-center">
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
