"use client";

import { signOut } from "next-auth/react";

const LogOutButton = () => {
  return (
    <button className="w-full text-start" onClick={() => signOut()}>
      Log out
    </button>
  );
};
export default LogOutButton;
