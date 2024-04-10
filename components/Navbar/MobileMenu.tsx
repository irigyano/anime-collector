"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import type { User } from "@/types/user";
import { AiOutlineMenu } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "next-auth/react";
import SignInPanel from "@/components/SignInPanel";
import ThemeToggle from "./ThemeToggle";

const MobileMenu = ({ currentUser }: { currentUser: User }) => {
  return (
    <div className="relative flex basis-1/3 justify-end pr-4 lg:hidden">
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <AiOutlineMenu className="text-2xl" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {currentUser && (
              <>
                <DropdownMenuLabel className="flex justify-center">
                  <Image
                    className="rounded-full"
                    alt="avatar"
                    src={currentUser.image || "/images/KEKW.webp"}
                    width={80}
                    height={80}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/images/KEKW.webp";
                    }}
                  />
                </DropdownMenuLabel>
                <DropdownMenuItem className="justify-center">
                  <Link href={`/user/?name=${currentUser.username}`}>
                    @{currentUser.username}
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem className="justify-center">
              <Link href={"/home"}>
                <span>主頁</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center">
              <Link href={"/activity"}>社群動態</Link>
            </DropdownMenuItem>
            {currentUser ? (
              <DropdownMenuItem className="justify-center">
                <button className="w-full" onClick={() => signOut()}>
                  <div className="flex items-center justify-center">
                    <RiLogoutBoxLine size={20} />
                    <div className="mx-2">登出</div>
                  </div>
                </button>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className="justify-center">
                <DialogTrigger>登入</DialogTrigger>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <ThemeToggle />
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <SignInPanel />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default MobileMenu;
