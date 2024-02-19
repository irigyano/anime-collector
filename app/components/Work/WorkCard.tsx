"use client";
import Image from "next/image";
import { useState } from "react";
import WorkModal from "./WorkModal/WorkModal";
import cover_replacement from "../../../public/images/cover_replacement.webp";
import TagList from "./TagList";
import { WorkData } from "@/app/types/types";
import { parseAsInteger, useQueryState } from "next-usequerystate";
import { filterUrl } from "@/lib/utils";
import ModalOverlay from "./WorkModal/ModalOverlay";

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
          className="relative mb-1 h-40 cursor-pointer overflow-hidden rounded-lg drop-shadow-lg min-[2560px]:h-[20vh]"
        >
          <Image
            className="object-cover duration-300 hover:scale-110 hover:blur-sm"
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
        <h3 className="mx-1 truncate">{work.title}</h3>
      </figure>
      {showModal && (
        <ModalOverlay toggleModal={toggleModal}>
          <WorkModal work={work} srcUrl={srcUrl} toggleModal={toggleModal} />
        </ModalOverlay>
      )}
    </>
  );
};
export default WorkCard;
