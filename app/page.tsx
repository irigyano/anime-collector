import LogInButton from "@/components/LogInButton";
import SignUpButton from "@/components/SignUpButton";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import collection from "../public/images/intro/collection.png";
import userpage from "../public/images/intro/userpage.png";
import searchbyjp from "../public/images/intro/searchbyjp.png";
import viewbyseason from "../public/images/intro/viewbyseason.png";
import IntroSlide from "@/components/IntroSlide";

async function getSession() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return session.user;
}

const IndexPage = async () => {
  const user = await getSession();

  if (user) {
    redirect("/home");
  }

  return (
    <div className="min-h-screen bg-4x animate-BgFloat bg-gradient-to-br from-yellow-100 from-10% via-sky-200 via-30% to-zinc-500 to-90%">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl pt-10 px-5">Share your Anime Collection with Friends.</h1>
        <div className="h-10 w-40 flex text-center justify-center items-center mt-4">
          <LogInButton />
          <SignUpButton />
        </div>
        <Link
          href={"/home"}
          className="my-2 text-sm text-zinc-600 duration-200 hover:text-blue-500"
        >
          先到處看看 ..
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-5 p-5 rounded-lg overflow-hidden md:justify-center">
        <IntroSlide imageSrc={collection} text={"根據視聽收藏作品"} />
        <IntroSlide imageSrc={userpage} text={"瀏覽社群成員收藏"} />
        <IntroSlide imageSrc={searchbyjp} text={"支援日文搜尋作品"} />
        <IntroSlide imageSrc={viewbyseason} text={"依照季度瀏覽作品"} />
      </div>
    </div>
  );
};
export default IndexPage;
