"use client";
import { SetStateAction } from "react";

import Link from "next/link";

const MenuModal = ({
  toggleModal,
  setTheme,
}: {
  toggleModal: () => void;
  setTheme: React.Dispatch<SetStateAction<string | null>>;
}) => {
  return (
    <div className="fixed inset-0 w-full h-full z-20" onClick={toggleModal}>
      <div
        className="shadow-2xl absolute right-2 w-[40vw] top-14 rounded-2xl bg-[#fff] text-[#0f0f0f] dark:bg-[#0f0f0f] dark:text-[#f1f1f1]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col p-2">
          <h1>avatar/username</h1>
          <div className="border-t m-1"></div>
          <Link href={"/"}>Home</Link>
          <div className="border-t m-1"></div>

          <select
            size={1}
            onChange={(e) => {
              setTheme(e.target.value);
            }}
            className="bg-[#fff] text-[#0f0f0f] dark:bg-[#0f0f0f] dark:text-[#f1f1f1]"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <h1>Sign In/Out Regi?</h1>
        </div>
      </div>
    </div>
  );
};
export default MenuModal;
