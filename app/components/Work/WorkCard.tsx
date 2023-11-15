"use client";

import Image from "next/image";
import { useState } from "react";
import WorkModal from "./WorkModal/WorkModal";
import cover_replacement from "../../../public/images/cover_replacement.webp";
import TagList from "./TagList";
import { WorkData } from "@/app/types/types";

const WorkCard = ({ work }: { work: WorkData }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  // filling empty image src
  let workUrl =
    work.image?.facebookOgImageUrl ||
    work.image?.recommendedImageUrl ||
    cover_replacement;
  // Validate if workUrl starts with http/https
  if (
    workUrl === "string" &&
    !workUrl.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
  ) {
    workUrl = cover_replacement;
  }

  const [srcUrl, SetSrcUrl] = useState(workUrl);

  return (
    <>
      <figure key={work.annictId} className="mx-4 my-1 w-96 overflow-hidden">
        <div
          onClick={toggleModal}
          className="relative h-40 drop-shadow-lg rounded-lg cursor-pointer overflow-hidden mb-1"
        >
          <Image
            className="object-cover hover:scale-110 hover:blur-sm duration-300"
            alt="cover_photo"
            src={srcUrl}
            fill
            priority={true}
            onError={() => {
              SetSrcUrl(
                "https://realsound.jp/wp-content/uploads/2022/11/20221118-botchitherock-00009.jpg"
              );
            }}
            sizes="540px"
          />
        </div>
        <div className="flex">
          <TagList work={work} />
        </div>

        <h1 className="truncate mx-1">{work.title}</h1>
      </figure>
      {showModal && (
        <WorkModal toggleModal={toggleModal} work={work} srcUrl={srcUrl} />
      )}
    </>
  );
};
export default WorkCard;
