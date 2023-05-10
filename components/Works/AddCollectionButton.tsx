"use client";

import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { ReactNode } from "react";
import { addCollection } from "@/app/redux/features/user/userSlice";
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";

type AddCollectionButtonProp = {
  workId: number;
  category: "watchedWorks" | "watchingWorks" | "followingWorks";
  color: string;
  icon: ReactNode;
  currentUser: User | null;
  text: string;
};

const useAppDispatch: () => AppDispatch = useDispatch;

const AddCollectionButton = ({
  workId,
  icon,
  category,
  color,
  text,
  currentUser,
}: AddCollectionButtonProp) => {
  const dispatch = useAppDispatch();

  return (
    <div className="basis-1/3 flex flex-col justify-center items-center m-2">
      <button
        className={`duration-300 ${color}`}
        onClick={async () => {
          if (!currentUser) {
            return toast.error("請先登入");
          }

          const res = await fetch("/api/collection", {
            method: "POST",
            body: JSON.stringify({ category: category, annictId: workId }),
          });

          if (res.status === 200) {
            const data = await res.json();
            const updatedUser = { ...currentUser, ...data };
            dispatch(addCollection(updatedUser));
            toast.success("收藏成功");
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
export default AddCollectionButton;
