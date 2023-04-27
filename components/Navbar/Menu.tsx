"use client";

import { SetStateAction, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuModal from "./MenuModal";

const Menu = ({ setTheme }: { setTheme: React.Dispatch<SetStateAction<string | null>> }) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleModal = () => setShowMenu(!showMenu);
  return (
    <div className="relative lg:hidden">
      <button
        onClick={toggleModal}
        className={` h-10 w-8 flex justify-center items-center text-2xl ${
          showMenu ? "text-blue-500" : ""
        }`}
      >
        <AiOutlineMenu />
      </button>
      {showMenu && <MenuModal toggleModal={toggleModal} setTheme={setTheme} />}
    </div>
  );
};
export default Menu;
