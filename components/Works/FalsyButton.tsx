"use client";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { SetStateAction, ReactNode } from "react";

type FalsyButtonProp = {
  workId: number;
  category: "watchedWorks" | "watchingWorks" | "followingWorks";
  color: string;
  stateSetter: React.Dispatch<SetStateAction<boolean>>;
  category2: "watchedWorks" | "watchingWorks" | "followingWorks";
  isCategory2: boolean;
  category2Setter: React.Dispatch<SetStateAction<boolean>>;
  category3: "watchedWorks" | "watchingWorks" | "followingWorks";
  isCategory3: boolean;
  category3Setter: React.Dispatch<SetStateAction<boolean>>;
  icon: ReactNode;
  currentUser: User | null;
  text: string;
};

const FalsyButton = ({
  workId,
  stateSetter,
  category2,
  isCategory2,
  category2Setter,
  category3,
  isCategory3,
  category3Setter,
  icon,
  category,
  color,
  text,
  currentUser,
}: FalsyButtonProp) => {
  return (
    <div className="basis-1/3 flex flex-col justify-center items-center m-2">
      <button
        className={`duration-300 ${color}`}
        onClick={() => {
          if (!currentUser) {
            return toast.error("請先登入");
          }
          toast.success("收藏成功");
          stateSetter(true);
          // keep watching state to 1 at a time
          category2Setter(false);
          category3Setter(false);
          fetch(`/api/${category}/${workId}`, {
            method: "POST",
          });
          // sync to the database
          if (isCategory2) {
            fetch(`/api/${category2}/${workId}`, {
              method: "DELETE",
            });
          }
          if (isCategory3) {
            fetch(`/api/${category3}/${workId}`, {
              method: "DELETE",
            });
          }
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
export default FalsyButton;
