import LogInButton from "@/components/LogInButton";
import SignUpButton from "@/components/SignUpButton";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

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
    <>
      <div className="w-full h-screen flex flex-col items-center px-10 bg-[#fff]">
        <h1 className="text-3xl my-20">Share your taste with friends.</h1>

        <div className="h-10 w-40 flex text-center justify-center items-center">
          <LogInButton />
          <SignUpButton />
        </div>
        <Link className="my-5" href={"/home"}>
          先到處看看 ..
        </Link>
      </div>
      <div className="w-full h-screen flex flex-col items-center bg-blue-500"></div>
    </>
  );
};
export default IndexPage;
