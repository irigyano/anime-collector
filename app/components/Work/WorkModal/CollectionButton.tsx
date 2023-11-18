"use client";

import toast from "react-hot-toast";
import { UserClientSide } from "@/app/types/types";
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
    if (!currentUser) return toast.error("請先登入", { id: "error" });

    if (currentUser[category].includes(workId)) {
      const res = await fetch("/api/collection", {
        method: "DELETE",
        body: JSON.stringify({ category, annictId: workId }),
      });
      const user = await res.json();
      if (res.status === 200) {
        dispatch(removeCollection(user));
        return toast.success("取消收藏");
      }
    } else {
      const res = await fetch("/api/collection", {
        method: "POST",
        body: JSON.stringify({ category, annictId: workId }),
      });
      const user = await res.json();
      if (res.status === 200) {
        dispatch(addCollection(user));
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
