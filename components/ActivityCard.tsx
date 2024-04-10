"use client";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import relativeTime from "dayjs/plugin/relativeTime";
import { Action, Prisma } from "@prisma/client";
import { useState } from "react";
import ModalOverlay from "./Work/WorkModal/ModalOverlay";
import WorkModal from "./Work/WorkModal/WorkModal";
import type { Work } from "@/types/work";
import { filterUrl } from "@/lib/utils";
import cover_replacement from "@/public/images/cover_replacement.webp";

dayjs.locale("zh-tw");
dayjs.extend(relativeTime);

type ActivityWithUser = Prisma.ActivityGetPayload<{ include: { user: true } }>;

const actionMap: Record<Action, string> = {
  FOLLOW: "追蹤了",
  WATCH: "正在看",
  FINISH: "看完",
  COMMENT: "在",
};

const ActivityCard = ({
  activity,
  work,
}: {
  activity: ActivityWithUser;
  work: Work;
}) => {
  const { user, action, workTitle, createdAt } = activity;

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  let workUrl =
    filterUrl(work.image?.facebookOgImageUrl) ||
    filterUrl(work.image?.recommendedImageUrl) ||
    cover_replacement;

  return (
    <li className="flex w-fit gap-2 rounded-lg bg-gray-400 bg-opacity-20 p-2 hover:bg-opacity-30">
      {/* User */}
      <div className="flex items-center">
        <div className="flex gap-2">
          <Link href={`/user/?name=${user.username}`} className="min-w-[48px]">
            <Image
              className="rounded-full"
              alt="avatar"
              src={user.image || "/images/KEKW.webp"}
              width={48}
              height={48}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/images/KEKW.webp";
              }}
            />
          </Link>
          <div>
            <Link
              className="block w-20 truncate hover:text-blue-600 hover:underline sm:w-auto"
              href={`/user/?name=${user.username}`}
            >
              @{user.username}
            </Link>
            <div className="text-sm text-slate-500">
              {dayjs(createdAt).fromNow()}
            </div>
          </div>
        </div>
      </div>
      {/* Work */}
      <div className="flex items-center">
        <div>
          <span className="text-slate-500">{actionMap[action]}</span>
          <span
            onClick={toggleModal}
            className="cursor-pointer break-all px-1 hover:text-blue-600 hover:underline"
          >
            {workTitle}
          </span>
          <span className="text-slate-500">
            {action === "FINISH" && "了！"}
            {action === "COMMENT" && "新增了留言！"}
            {action === "FOLLOW" && "。"}
            {action === "WATCH" && "。"}
          </span>
        </div>
      </div>
      {showModal && (
        <ModalOverlay toggleModal={toggleModal}>
          <WorkModal work={work} srcUrl={workUrl} toggleModal={toggleModal} />
        </ModalOverlay>
      )}
    </li>
  );
};

export default ActivityCard;
