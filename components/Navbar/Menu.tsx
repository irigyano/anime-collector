"use client";

import { SetStateAction, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuModal from "./MenuModal";
import { User } from "@prisma/client";

type MenuProps = {
  currentUser?: User | null;
  theme: string | null;
  setTheme: React.Dispatch<SetStateAction<string | null>>;
};

const Menu = ({ theme, currentUser, setTheme }: MenuProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleModal = () => setShowMenu(!showMenu);
  return (
    <div className="relative flex justify-end basis-1/3 lg:hidden">
      <button
        onClick={toggleModal}
        className={` h-10 w-8 flex justify-center items-center text-2xl ${
          showMenu ? "text-blue-500" : ""
        }`}
      >
        <AiOutlineMenu />
      </button>
      {showMenu && (
        <MenuModal
          theme={theme}
          currentUser={currentUser}
          toggleModal={toggleModal}
          setTheme={setTheme}
        />
      )}
    </div>
  );
};
export default Menu;
