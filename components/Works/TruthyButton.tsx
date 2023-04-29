"use client";
import { SetStateAction, ReactNode } from "react";
import toast from "react-hot-toast";

type TruthyButtonProp = {
  workId: number;
  category: string;
  color: string;
  text: string;
  stateSetter: React.Dispatch<SetStateAction<boolean>>;
  icon: ReactNode;
};

const TruthyButton = ({ workId, text, stateSetter, icon, category, color }: TruthyButtonProp) => {
  return (
    <div
      className={`basis-1/3 flex flex-col justify-center items-center m-2 duration-300 ${color}`}
    >
      <button
        onClick={async () => {
          stateSetter(false);
          toast.success("取消收藏");
          await fetch(`/api/${category}/${workId}`, {
            method: "DELETE",
          });
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
export default TruthyButton;
