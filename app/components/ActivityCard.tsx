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
import { WorkData } from "../types/types";
import { filterUrl } from "@/lib/utils";
import cover_replacement from "../../public/images/cover_replacement.webp";

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
  work: WorkData;
}) => {
  const { user, action, workTitle, createdAt } = activity;

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  let workUrl =
    filterUrl(work.image?.facebookOgImageUrl) ||
    filterUrl(work.image?.recommendedImageUrl) ||
    cover_replacement;

  return (
    <li className="relative flex gap-2 pl-8">
      <span className="absolute left-0 z-10 flex -translate-x-1/2 items-center justify-center">
        <Link href={`/user/${user.username}`}>
          <Image
            className="rounded-full"
            alt="avatar"
            src={user.image}
            width={48}
            height={48}
          />
        </Link>
      </span>
      <div>
        <Link
          className="hover:text-blue-600 hover:underline"
          href={`/user/${user.username}`}
        >
          @{user.username}
        </Link>
        <div className="text-sm text-slate-500">
          {dayjs(createdAt).fromNow()}
        </div>
      </div>
      <div>
        <span className="break-keep text-slate-500">{actionMap[action]}</span>
        <span
          onClick={toggleModal}
          className="cursor-pointer px-1 hover:text-blue-600 hover:underline"
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
      {showModal && (
        <ModalOverlay toggleModal={toggleModal}>
          <WorkModal work={work} srcUrl={workUrl} toggleModal={toggleModal} />
        </ModalOverlay>
      )}
    </li>
  );
};

export default ActivityCard;
