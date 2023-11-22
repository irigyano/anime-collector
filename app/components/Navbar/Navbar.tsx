import Link from "next/link";
import Image from "next/image";
import SearchInput from "./SearchInput";
import MobileMenu from "./MobileMenu";
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
import { getUserFromSession } from "@/lib/utils";

const Navbar = async () => {
  const currentUser = await getUserFromSession();
  return (
    <>
      {/* hacky stuff due to radix ui overlay hiding scrollbar by default. */}
      <div className="h-16 fixed w-screen bg-white dark:bg-black -z-20 border-b shadow-md " />
      <nav className="flex justify-center lg:justify-between lg:px-20 border-b shadow-md items-center h-16 z-20 sticky top-0  bg-white dark:bg-black">
        <div className="h-10 flex items-center justify-start gap-3 basis-1/3">
          <Link href={"/"}>
            <Image
              className="rounded-full hidden lg:block hover:border-b-2 border-transparent"
              alt="logo"
              src={"/images/GWEN.webp"}
              width={40}
              height={40}
            />
          </Link>
          <Link
            href={"/activity"}
            className="hover:text-blue-500 duration-300 hidden lg:block text-center m-1"
          >
            社群動態
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
    </>
  );
};

export default Navbar;
