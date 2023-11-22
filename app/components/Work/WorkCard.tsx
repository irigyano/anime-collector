"use client";
import Image from "next/image";
import { useState } from "react";
import WorkModal from "./WorkModal/WorkModal";
import cover_replacement from "../../../public/images/cover_replacement.webp";
import TagList from "./TagList";
import { WorkData } from "@/app/types/types";
import { parseAsInteger, useQueryState } from "next-usequerystate";

function filterUrl(url: any): string | undefined {
  if (typeof url !== "string") return;

  const result = url.match(
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/g
  );
  if (result) return url;
}

const WorkCard = ({ work }: { work: WorkData }) => {
  const [modalParam, setModalParam] = useQueryState("modal", parseAsInteger);
  const [showModal, setShowModal] = useState(modalParam === work.annictId);
  const toggleModal = () => setShowModal(!showModal);

  // filling empty image src
  let workUrl =
    filterUrl(work.image?.facebookOgImageUrl) ||
    filterUrl(work.image?.recommendedImageUrl) ||
    cover_replacement;
  const [srcUrl, SetSrcUrl] = useState(workUrl);

  return (
    <>
      <figure key={work.annictId} className="mx-4 my-1 overflow-hidden">
        <div
          onClick={() => {
            toggleModal();
            setModalParam(work.annictId);
          }}
          className="relative h-40 drop-shadow-lg rounded-lg cursor-pointer overflow-hidden mb-1"
        >
          <Image
            className="object-cover hover:scale-110 hover:blur-sm duration-300"
            alt="cover_photo"
            src={srcUrl}
            fill
            priority={true}
            onError={() => {
              SetSrcUrl(cover_replacement);
            }}
            sizes="(min-width: 640px) 50vw, (min-width: 1024px) 33vw, (min-width: 1536px) 25vw, 100vw"
          />
        </div>
        <div className="flex">
          <TagList work={work} />
        </div>
        <h3 className="truncate mx-1">{work.title}</h3>
      </figure>
      {showModal && (
        <WorkModal toggleModal={toggleModal} work={work} srcUrl={srcUrl} />
      )}
    </>
  );
};
export default WorkCard;
