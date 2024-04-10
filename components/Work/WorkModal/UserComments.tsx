"use client";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import relativeTime from "dayjs/plugin/relativeTime";
import UserComment from "./UserComment";
import { useQuery } from "@tanstack/react-query";

type CommentWithUser = Prisma.CommentGetPayload<{ include: { user: true } }>;

dayjs.locale("zh-tw");
dayjs.extend(relativeTime);

const UserComments = ({ workId }: { workId: number }) => {
  async function getComments(): Promise<CommentWithUser[]> {
    const res = await fetch(`/api/comment?work=${workId}`);
    return res.json();
  }

  const {
    data: comments,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  if (isLoading)
    return <p className="flex h-[20%] items-center justify-center">讀取中</p>;

  return (
    <>
      {comments?.length ? (
        <div className="flex min-h-[20%] flex-col gap-4 p-2">
          {comments.map((comment) => (
            <UserComment key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <p className="flex h-[20%] items-center justify-center">
          成為第一個留言的人！
        </p>
      )}
    </>
  );
};

export default UserComments;
