"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { UserClientSide } from "@/app/types/types";
import { AiOutlineMenu } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "next-auth/react";
import SignInPanel from "../SignInPanel";
import ThemeToggle from "./ThemeToggle";

const MobileMenu = ({
  currentUser,
}: {
  currentUser: UserClientSide | null;
}) => {
  return (
    <div className="relative flex justify-end basis-1/3 lg:hidden pr-4">
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
                  />
                </DropdownMenuLabel>
                <DropdownMenuItem className="justify-center">
                  <Link href={`/user/${currentUser.id}`}>
                    @{currentUser.username}
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem className="justify-center">
              <Link href={"/"}>主頁</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center">
              <Link href={"/activity"}>社群動態</Link>
            </DropdownMenuItem>
            {currentUser ? (
              <DropdownMenuItem className="justify-center">
                <button className="w-full" onClick={() => signOut()}>
                  <div className="flex justify-center items-center">
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
