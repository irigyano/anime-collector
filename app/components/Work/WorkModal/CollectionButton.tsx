"use client";
import toast from "react-hot-toast";
import { WorkData } from "@/app/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserFromSession } from "@/lib/getUserAction";

type CollectionButtonProp = {
  children: React.ReactNode;
  work: WorkData;
  category: "followingWorks" | "watchingWorks" | "finishedWorks";
  color: string;
  hoverColor: string;
};

const CollectionButton = ({
  children,
  work,
  category,
  color,
  hoverColor,
}: CollectionButtonProp) => {
  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserFromSession(),
  });

  const queryClient = useQueryClient();

  const doAddCollection = useMutation({
    mutationFn: () => {
      return fetch("/api/collection", {
        method: "POST",
        body: JSON.stringify({ category, annictId: work.annictId }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      fetch("/api/activity", {
        method: "POST",
        body: JSON.stringify({
          category,
          annictId: work.annictId,
          workTitle: work.title,
        }),
      });
      toast.success("收藏成功");
    },
  });

  const doRemoveCollection = useMutation({
    mutationFn: () =>
      fetch("/api/collection", {
        method: "DELETE",
        body: JSON.stringify({ category, annictId: work.annictId }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("取消收藏");
    },
  });

  const modifyCollection = async () => {
    if (!currentUser) return toast.error("請先登入", { id: "error" });

    if (currentUser[category].includes(work.annictId))
      return doRemoveCollection.mutate();

    return doAddCollection.mutate();
  };

  const isPressed = currentUser
    ? currentUser[category].includes(work.annictId)
    : false;

  return (
    <div className="m-2 flex basis-1/3 flex-col items-center justify-center">
      <button
        className={`flex flex-col items-center duration-300 ${
          isPressed ? color : hoverColor
        }`}
        onClick={modifyCollection}
      >
        {children}
      </button>
    </div>
  );
};
export default CollectionButton;
