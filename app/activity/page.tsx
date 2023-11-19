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
};

dayjs.locale("zh-tw");
dayjs.extend(relativeTime);

const ActivityPage = async () => {
  // filter repeated action
  const activities = await prisma.activity.findMany({
    orderBy: [{ createdAt: "desc" }],
    take: 20,
    include: { user: true },
  });

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
              <div className="flex flex-col flex-1 gap-0">
                <div>
                  <Link
                    className="hover:text-blue-500 duration-300"
                    href={`/user/${user.username}`}
                  >
                    {user.username}&nbsp;
                  </Link>
                  <span className="">{actionMap[action]}&nbsp;</span>
                  {/* consider opening a modal? */}
                  <Link
                    className="hover:text-blue-500 duration-300"
                    href={`https://annict.com/works/${workId}`}
                    target="_blank"
                  >
                    {workTitle}
                  </Link>
                  {action === "FINISH" && <span>&nbsp;了！</span>}
                </div>
                <p className="text-sm text-slate-500">
                  {dayjs(createdAt).fromNow()}
                </p>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
export default ActivityPage;
