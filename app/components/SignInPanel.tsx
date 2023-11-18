"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

const SignInPanel = () => {
  return (
    <>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background text-muted-foreground">
          continue with
        </span>
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
    </>
  );
};

export default SignInPanel;
