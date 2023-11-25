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

  useEffect(() => {
    fetch(`/api/comment?work=${workId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [form.formState.isSubmitSuccessful]);

  return (
    <>
      {comments && (
        <div className="flex flex-col gap-4 py-4">
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
                <Link href={`/user/${comment.user.username}`}>
                  @{comment.user.username}
                </Link>
                <span> · {dayjs(comment.createdAt).fromNow()}</span>
                <div className="break-all">{comment.comment}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserComments;
