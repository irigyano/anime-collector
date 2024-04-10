import Link from "next/link";
import Image from "next/image";
import SearchInput from "./SearchInput";
import MobileMenu from "./MobileMenu";
import ProfileDropdown from "./ProfileDropdown";
import { ThemeSwitch } from "./ThemeSwitch";
import { Github, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SignInPanel from "../SignInPanel";
import { getUserFromSession } from "@/lib/utils";

const Navbar = async () => {
  const currentUser = await getUserFromSession();
  return (
    <>
      {/* hacky stuff due to radix ui overlay hiding scrollbar by default. */}
      <div className="fixed -z-20 h-16 w-screen border-b bg-white shadow-md dark:bg-black " />
      <nav className="sticky top-0 z-20 flex h-16 items-center justify-center border-b bg-white shadow-md dark:bg-black  lg:justify-between lg:px-20">
        <div className="flex h-10 basis-1/3 items-center justify-start gap-3">
          <Link href={"/home"}>
            <Image
              className="hidden rounded-full border-transparent hover:border-b-2 lg:block"
              alt="logo"
              src={"/images/YEP.webp"}
              width={40}
              height={40}
            />
          </Link>
          <Link
            href={"/activity"}
            className="m-1 hidden text-center duration-300 hover:text-blue-500 lg:block"
          >
            社群動態
          </Link>
          <Link
            className="m-1 hidden text-center duration-300 hover:text-blue-500 lg:block"
            target="_blank"
            href={"https://annict.com/"}
          >
            Annict.com
          </Link>
        </div>
        <SearchInput />
        <div className="hidden basis-1/3 items-center justify-end gap-2 lg:flex">
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
              <DialogTrigger className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
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
