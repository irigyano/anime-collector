"use client";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import { Button } from "@/app/components/ui/button";
import { Check, Pencil, Trash2, Undo2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/app/components/ui/input";
import toast from "react-hot-toast";
import { getUserFromSession } from "@/lib/getUserAction";

type CommentWithUser = Prisma.CommentGetPayload<{ include: { user: true } }>;

const UserComment = ({ comment }: { comment: CommentWithUser }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserFromSession(),
  });

  const queryClient = useQueryClient();
  const doEdit = useMutation({
    mutationFn: ({ editedComment }: { editedComment: string }) =>
      fetch("/api/comment", {
        method: "PUT",
        body: JSON.stringify({ commentId: comment.id, comment: editedComment }),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("編輯成功");
      setIsEditing(!isEditing);
    },
  });
  const doDelete = useMutation({
    mutationFn: () =>
      fetch("/api/comment", {
        method: "DELETE",
        body: JSON.stringify({ commentId: comment.id }),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("刪除成功");
    },
  });

  return (
    <div className="flex gap-2">
      <Image
        className="rounded-full"
        src={comment.user.image}
        alt="avatar"
        width={50}
        height={50}
      />
      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <Input
            className="flex-1"
            defaultValue={comment.comment}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                doEdit.mutate({
                  editedComment: (e.target as HTMLInputElement).value,
                });
              }
            }}
          />
          {/* enable this button would require local editComment state */}
          {/* <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            <Check className="h-[1.2rem] w-[1.2rem] " />
          </Button> */}
          <Button
            variant="outline"
            size="icon"
            title="Undo"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            <Undo2 className="h-[1.2rem] w-[1.2rem] " />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1">
            <Link
              className="hover:text-blue-500"
              href={`/user/?name=${comment.user.username}`}
            >
              @{comment.user.username}
            </Link>
            <span> · {dayjs(comment.createdAt).fromNow()}</span>
            <div className="break-all">{comment.comment}</div>
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
                  doDelete.mutate();
                }}
              >
                <Trash2 className="h-[1.2rem] w-[1.2rem] " />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserComment;
