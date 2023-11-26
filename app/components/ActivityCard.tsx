"use client";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import relativeTime from "dayjs/plugin/relativeTime";
import { Action, Prisma } from "@prisma/client";

dayjs.locale("zh-tw");
dayjs.extend(relativeTime);

type ActivityWithUser = Prisma.ActivityGetPayload<{ include: { user: true } }>;

const actionMap: Record<Action, string> = {
  FOLLOW: "追蹤了",
  WATCH: "正在看",
  FINISH: "看完",
  COMMENT: "在",
};

const ActivityCard = ({ activity }: { activity: ActivityWithUser }) => {
  const { user, action, workTitle, workId, createdAt } = activity;

  return (
    <li role="article" className="relative pl-8">
      <span className="absolute left-0 z-10 flex items-center justify-center -translate-x-1/2">
        <Link
          className="hover:text-blue-500 duration-300"
          href={`/user/${user.username}`}
        >
          <Image
            className="rounded-full"
            alt="avatar"
            src={user.image}
            width={48}
            height={48}
          />
        </Link>
      </span>
      <div className="flex gap-2">
        <div className="">
          <Link
            className="hover:text-blue-500 duration-300 text-green-500"
            href={`/user/${user.username}`}
          >
            @{user.username}
          </Link>
          <div className="text-sm text-slate-500">
            {dayjs(createdAt).fromNow()}
          </div>
        </div>
        <span className="break-keep">{actionMap[action]}</span>
        <div>
          <Link
            className="hover:text-blue-500 duration-300 text-red-500"
            href={`https://annict.com/works/${workId}`}
            target="_blank"
          >
            {workTitle}
          </Link>
          {action === "FINISH" && <span className="pl-1">了！</span>}
          {action === "COMMENT" && <span className="pl-1">新增了留言！</span>}
        </div>
      </div>
    </li>
  );
};

export default ActivityCard;
