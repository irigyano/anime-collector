"use client";

import toast from "react-hot-toast";
import { UserClientSide } from "@/types/UserClientSide";
import { ReactNode } from "react";
import { addCollection } from "@/app/redux/features/user/userSlice";
import { removeCollection } from "@/app/redux/features/user/userSlice";
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";

type CollectionButtonProp = {
  workId: number;
  category: "watchedWorks" | "watchingWorks" | "followingWorks";
  color: string;
  icon: ReactNode;
  currentUser: UserClientSide | null;
  text: string;
};

const useAppDispatch: () => AppDispatch = useDispatch;

const CollectionButton = ({
  workId,
  icon,
  category,
  color,
  text,
  currentUser,
}: CollectionButtonProp) => {
  const dispatch = useAppDispatch();

  const modifyCollection = async () => {
    if (!currentUser) {
      return toast.error("請先登入");
    }

    if (currentUser[category].includes(workId)) {
      const data = await fetch("/api/collection", {
        method: "PUT",
        body: JSON.stringify({ category: category, annictId: workId }),
      });

      if (data.status === 200) {
        const updatedWorks = [...currentUser[category]];
        updatedWorks.splice(updatedWorks.indexOf(workId));
        const updatedUser = { ...currentUser };
        updatedUser[category] = updatedWorks;
        dispatch(removeCollection(updatedUser));

        return toast.success("取消收藏");
      }
    } else {
      const res = await fetch("/api/collection", {
        method: "POST",
        body: JSON.stringify({ category: category, annictId: workId }),
      });

      if (res.status === 200) {
        const data = await res.json();
        const updatedUser = { ...currentUser, ...data };
        dispatch(addCollection(updatedUser));
        return toast.success("收藏成功");
      }
    }
  };

  return (
    <div className="basis-1/3 flex flex-col justify-center items-center m-2">
      <button className={`duration-300 ${color}`} onClick={modifyCollection}>
        <div className="flex justify-center">
          <div>{icon}</div>
        </div>
        <div>{text}</div>
      </button>
    </div>
  );
};
export default CollectionButton;
