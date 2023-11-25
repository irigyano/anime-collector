import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { Action, Activity } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import relativeTime from "dayjs/plugin/relativeTime";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "社群動態",
  description: "check out the weebs",
};

const actionMap: Record<Action, string> = {
  FOLLOW: "追蹤了",
  WATCH: "正在看",
  FINISH: "看完",
  COMMENT: "在",
};

dayjs.locale("zh-tw");
dayjs.extend(relativeTime);

function filterAndReverse(activities: Activity[]) {
  // in place action
  for (let i = activities.length - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      const current = activities[i];
      const compare = activities[j];
      if (
        current.userId === compare.userId &&
        current.workId === compare.workId &&
        current.action === compare.action
      ) {
        activities.splice(j, 1);
        break;
      }
    }
  }
  activities.reverse();
}

const ActivityPage = async () => {
  const activities = await prisma.activity.findMany({
    orderBy: [{ createdAt: "asc" }],
    include: { user: true },
  });
  filterAndReverse(activities);

  return (
    <div className="flex justify-center">
      <ul
        aria-label="Colored activity feed"
        role="feed"
        className="relative flex flex-col gap-12 py-12 pl-8 before:absolute before:top-0 before:left-8 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-8 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200 "
      >
        {activities.map(
          ({ user, action, workTitle, workId, createdAt, id }) => (
            <li key={id} role="article" className="relative pl-8">
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
                  {action === "COMMENT" && (
                    <span className="pl-1">新增了留言！</span>
                  )}
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
export default ActivityPage;
