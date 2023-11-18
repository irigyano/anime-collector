import Link from "next/link";
import Image from "next/image";
import SearchInput from "./SearchInput";
import MobileMenu from "./MobileMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import ProfileDropdown from "./ProfileDropdown";
import { ThemeSwitch } from "./ThemeSwitch";
import { Github, LogIn } from "lucide-react";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import SignInPanel from "../SignInPanel";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  let currentUser = null;
  if (session?.user) {
    currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
  }
  return (
    <>
      <nav className="flex justify-center lg:justify-between lg:px-20 border-b shadow-md items-center w-full z-20 fixed bg-[#f1f1f1] dark:bg-[#0f0f0f] duration-500">
        <div className="h-10 flex items-center justify-start gap-4 basis-1/3">
          <Link
            href={"/"}
            className="hidden lg:block m-1 hover:border-b-2 border-transparent duration-100"
          >
            <Image alt="logo" src="/favicon.ico" width={40} height={40} />
          </Link>
          <Link
            href={"/user"}
            className="hover:text-blue-500 duration-300 hidden lg:block text-center m-1"
          >
            社群
          </Link>
          <Link
            className="hover:text-blue-500 duration-300 hidden lg:block text-center m-1"
            target="_blank"
            href={"https://annict.com/"}
          >
            Annict.com
          </Link>
        </div>
        <SearchInput />
        <div className="hidden basis-1/3 lg:flex gap-2 justify-end items-center">
          <Link
            href={"https://github.com/irigyano/Banngumi-View"}
            target="_blank"
          >
            <Button variant="outline" size="icon">
              <Github className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </Link>
          <ThemeSwitch />
          {currentUser ? (
            <ProfileDropdown currentUser={currentUser} />
          ) : (
            <Dialog>
              <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                <LogIn className="h-[1.2rem] w-[1.2rem]" />
              </DialogTrigger>
              <DialogContent>
                <SignInPanel />
              </DialogContent>
            </Dialog>
          )}
        </div>
        <MobileMenu currentUser={currentUser} />
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
