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
      <div className="w-full h-screen flex flex-col items-center bg-[#fff]">
        <h1 className="text-5xl text-center">Banngumi View</h1>
        <Link href={"/home"}>See More</Link>
        <div className="h-10 w-40 flex text-center justify-center items-center">
          <LogInButton />
          <SignUpButton />
        </div>
      </div>
      <div className="w-full h-screen flex flex-col items-center bg-blue-500">
        <h1 className="text-5xl text-center">Banngumi View</h1>
        <Link href={"/home"}>See More</Link>
        <div className="h-10 w-40 flex text-center justify-center items-center">
          <LogInButton />
          <SignUpButton />
        </div>
      </div>
    </>
  );
};
export default IndexPage;
