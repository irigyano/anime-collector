"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { UserClientSide } from "@/app/types/types";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "next-auth/react";
import Image from "next/image";
import LoginDialog from "../LoginDialog";

type MenuProps = {
  currentUser?: UserClientSide | null;
};

const MobileMenu = ({ currentUser }: MenuProps) => {
  return (
    <div className="relative flex justify-end basis-1/3 lg:hidden pr-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className={` h-10 w-8 flex justify-center items-center text-2xl`}
          >
            <AiOutlineMenu />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {currentUser && (
            <>
              <DropdownMenuLabel>
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
                  <Link href={`/user/${currentUser.id}`}>
                    <div className="hover:text-blue-500 hover:bg-slate-200 rounded-md duration-200 m-1">
                      @{currentUser.username}
                    </div>
                  </Link>
                </div>
              </DropdownMenuLabel>
            </>
          )}
          <DropdownMenuItem className="justify-center">
            <Link href={"/"}>主頁</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-center">
            <Link href={"/user"}>社群</Link>
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
            // DropdownMenuItem style
            <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 justify-center">
              <LoginDialog>
                <div>登入</div>
              </LoginDialog>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default MobileMenu;
