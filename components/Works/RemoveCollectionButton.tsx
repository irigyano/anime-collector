"use client";
import { ReactNode } from "react";
import toast from "react-hot-toast";
import { removeCollection } from "@/app/redux/features/user/userSlice";
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { User } from "@prisma/client";

type RemoveCollectionButtonProp = {
  workId: number;
  category: "watchedWorks" | "watchingWorks" | "followingWorks";
  color: string;
  text: string;
  icon: ReactNode;
  currentUser: User | null;
};

const useAppDispatch: () => AppDispatch = useDispatch;

const RemoveCollectionButton = ({
  workId,
  text,
  icon,
  category,
  color,
  currentUser,
}: RemoveCollectionButtonProp) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`basis-1/3 flex flex-col justify-center items-center m-2 duration-300 ${color}`}
    >
      <button
        onClick={() => {
          if (!currentUser) return;

          fetch("/api/collection", {
            method: "PUT",
            body: JSON.stringify({ category: category, annictId: workId }),
          });

          const updatedWorks = [...currentUser[category]];
          updatedWorks.splice(updatedWorks.indexOf(workId));

          const updatedUser = { ...currentUser };
          updatedUser[category] = updatedWorks;
          dispatch(removeCollection(updatedUser));

          toast.success("取消收藏");
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
export default RemoveCollectionButton;
