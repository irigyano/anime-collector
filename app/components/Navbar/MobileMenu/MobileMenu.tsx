"use client";

import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuModal from "./MobileMenuModal";
import { UserClientSide } from "@/app/types/types";

type MenuProps = {
  currentUser?: UserClientSide | null;
};

const MobileMenu = ({ currentUser }: MenuProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleModal = () => setShowMenu(!showMenu);
  return (
    <div className="relative flex justify-end basis-1/3 lg:hidden pr-4">
      <button
        onClick={toggleModal}
        className={` h-10 w-8 flex justify-center items-center text-2xl ${
          showMenu ? "text-blue-500" : ""
        }`}
      >
        <AiOutlineMenu />
      </button>
      {showMenu && (
        <MenuModal currentUser={currentUser} toggleModal={toggleModal} />
      )}
    </div>
  );
};
export default MobileMenu;
