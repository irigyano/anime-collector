"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const SignInPanel = () => {
  return (
    <>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="text-muted-foreground">立即加入。</span>
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          signIn("github");
        }}
      >
        <Github /> Github
      </Button>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          signIn("google");
        }}
      >
        <FcGoogle size={24} /> Google
      </Button>
    </>
  );
};

export default SignInPanel;
