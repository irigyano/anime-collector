"use client";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import { Button } from "@/app/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CommentWithUser = Prisma.CommentGetPayload<{ include: { user: true } }>;

const UserComment = ({ comment }: { comment: CommentWithUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const currentUser = useAppSelector((state) => state.user.user);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () =>
      fetch("/api/comment", {
        method: "DELETE",
        body: JSON.stringify({ commentId: comment.id }),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  return (
    <div className="flex gap-2">
      <div>
        <Image
          className="rounded-full"
          src={comment.user.image}
          alt="avatar"
          width={50}
          height={50}
        />
      </div>
      <div className="flex-1">
        <Link
          className="hover:text-blue-500"
          href={`/user/?name=${comment.user.username}`}
        >
          @{comment.user.username}
        </Link>
        <span> · {dayjs(comment.createdAt).fromNow()}</span>
        {isEditing ? (
          <div>edit</div>
        ) : (
          <div className="break-all">{comment.comment}</div>
        )}
      </div>
      {currentUser?.username === comment.user.username && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <Pencil className="h-[1.2rem] w-[1.2rem] " />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              mutation.mutate();
            }}
          >
            <Trash2 className="h-[1.2rem] w-[1.2rem] " />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserComment;
