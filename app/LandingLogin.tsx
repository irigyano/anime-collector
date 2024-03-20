"use client";
import { signIn } from "next-auth/react";
import { Button } from "./components/ui/button";
import { Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export function LandingLogin() {
  const router = useRouter();

  return (
    <div className="flex w-48 flex-col gap-2">
      <Button
        className=" rounded-full"
        variant="outline"
        type="button"
        onClick={() => {
          signIn("github");
        }}
      >
        <Github /> Github
      </Button>
      <Button
        className="rounded-full"
        variant="outline"
        type="button"
        onClick={() => {
          signIn("google");
        }}
      >
        <FcGoogle size={24} /> Google
      </Button>
      <div className="flex">
        <div className="flex flex-1 items-center">
          <div className="h-[1px] w-full bg-zinc-500"></div>
        </div>
        <div className="p-2">或</div>
        <div className="flex flex-1 items-center">
          <div className="h-[1px] w-full bg-zinc-500"></div>
        </div>
      </div>
      <Button
        className="rounded-full"
        variant="outline"
        type="button"
        onClick={() => {
          router.push(`/home`);
        }}
      >
        以訪客繼續
      </Button>
    </div>
  );
}
