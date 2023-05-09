"use client";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { SetStateAction, ReactNode } from "react";

type AddCollectionButtonProp = {
  workId: number;
  category: "watchedWorks" | "watchingWorks" | "followingWorks";
  color: string;
  stateSetter: React.Dispatch<SetStateAction<boolean>>;
  icon: ReactNode;
  currentUser: User | null;
  text: string;
};

const AddCollectionButton = ({
  workId,
  stateSetter,
  icon,
  category,
  color,
  text,
  currentUser,
}: AddCollectionButtonProp) => {
  return (
    <div className="basis-1/3 flex flex-col justify-center items-center m-2">
      <button
        className={`duration-300 ${color}`}
        onClick={async () => {
          if (!currentUser) {
            return toast.error("請先登入");
          }
          fetch("/api/collection", {
            method: "POST",
            body: JSON.stringify({ category: category, annictId: workId }),
          });
          stateSetter(true);
          toast.success("收藏成功");
        }}
      >
        <div className="flex justify-center">
          <div>{icon}</div>
        </div>
        <div>{text}</div>
      </button>
    </div>
  );
};
export default AddCollectionButton;
