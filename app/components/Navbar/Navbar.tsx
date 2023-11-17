import Link from "next/link";
import Image from "next/image";
import SearchInput from "./SearchInput";
import MobileMenu from "./MobileMenu";
import { BsGithub } from "react-icons/bs";
import LoginDialog from "../LoginDialog";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import ProfileDropdown from "./ProfileDropdown";

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
        <div className="h-10 flex items-center justify-start basis-1/3">
          <div className="hidden lg:block m-1 hover:border-b-2 border-transparent duration-100">
            <Link href={"/"} className="lg:block">
              <Image alt="logo" src="/favicon.ico" width={40} height={40} />
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="h-8 w-20 m-1 justify-center items-center flex">
              <Link
                className="hidden lg:block hover:text-blue-500 duration-300"
                href={"/user"}
              >
                社群
              </Link>
            </div>
          </div>
          <div className="h-8 w-20 m-1 justify-center items-center flex">
            <Link
              className="hidden lg:block hover:text-blue-500 duration-300"
              target="_blank"
              href={"https://annict.com/"}
            >
              Annict.com
            </Link>
          </div>
        </div>
        <SearchInput />
        <div className="hidden lg:flex basis-1/3 justify-end items-center">
          <Link
            href={"https://github.com/irigyano/Banngumi-View"}
            target="_blank"
            className="hover:text-blue-500 duration-300 h-10 w-10 m-1 flex justify-center items-center"
          >
            <BsGithub size={36} />
          </Link>
          {currentUser ? (
            <ProfileDropdown currentUser={currentUser} />
          ) : (
            <LoginDialog>
              <div className="h-10 w-40 flex text-center justify-center items-center">
                <div
                  className={
                    "flex basis-1/2 justify-center items-center h-8 m-2 duration-300 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-500 rounded-lg shadow-md"
                  }
                >
                  登入
                </div>
              </div>
            </LoginDialog>
          )}
        </div>
        <MobileMenu currentUser={currentUser} />
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
