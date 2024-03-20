"use client";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import relativeTime from "dayjs/plugin/relativeTime";

type CommentWithUser = Prisma.CommentGetPayload<{ include: { user: true } }>;

dayjs.locale("zh-tw");
dayjs.extend(relativeTime);

const UserComments = ({ form, workId }: { form: any; workId: number }) => {
  const [comments, setComments] = useState<CommentWithUser[]>();
  const [isLoading, setIsLoading] = useState(true);

  // consider tanstack query
  useEffect(() => {
    fetch(`/api/comment?work=${workId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setIsLoading(false);
      });
  }, [form.formState.isSubmitSuccessful]);

  if (isLoading)
    return <p className="flex h-[20%] items-center justify-center">讀取中</p>;

  return (
    <>
      {comments?.length ? (
        <div className="flex flex-col gap-4 p-2">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
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
                <div className="break-all">{comment.comment}</div>
              </div>
            </div>
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
