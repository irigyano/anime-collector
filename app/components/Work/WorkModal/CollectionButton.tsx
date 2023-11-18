"use client";
import toast from "react-hot-toast";
import { WorkData } from "@/app/types/types";
import { ReactNode } from "react";
import { addCollection } from "@/app/redux/features/user/userSlice";
import { removeCollection } from "@/app/redux/features/user/userSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

type CollectionButtonProp = {
  work: WorkData;
  category: "followingWorks" | "watchingWorks" | "finishedWorks";
  color: string;
  icon: ReactNode;
  text: string;
};

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch: () => AppDispatch = useDispatch;

const CollectionButton = ({
  work,
  icon,
  category,
  color,
  text,
}: CollectionButtonProp) => {
  const currentUser = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const modifyCollection = async () => {
    if (!currentUser) return toast.error("請先登入", { id: "error" });

    if (currentUser[category].includes(work.annictId)) {
      const res = await fetch("/api/collection", {
        method: "DELETE",
        body: JSON.stringify({ category, annictId: work.annictId }),
      });
      const user = await res.json();
      if (res.status === 200) {
        dispatch(removeCollection(user));
        return toast.success("取消收藏");
      }
    } else {
      const res = await fetch("/api/collection", {
        method: "POST",
        body: JSON.stringify({ category, annictId: work.annictId }),
      });
      const user = await res.json();
      if (res.status === 200) {
        dispatch(addCollection(user));
        const tmp = await fetch("/api/activity", {
          method: "POST",
          body: JSON.stringify({
            category,
            annictId: work.annictId,
            workTitle: work.title,
          }),
        });
        console.log(tmp);
        return toast.success("收藏成功");
      }
    }
  };

  const isPressed = currentUser
    ? currentUser[category].includes(work.annictId)
    : false;

  return (
    <div className="basis-1/3 flex flex-col justify-center items-center m-2">
      <button
        className={`duration-300 ${isPressed ? color : `hover:${color}`}`}
        onClick={modifyCollection}
      >
        <div className="flex justify-center">
          <div>{icon}</div>
        </div>
        <div>{text}</div>
      </button>
    </div>
  );
};
export default CollectionButton;
