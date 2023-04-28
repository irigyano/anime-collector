"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import WorkModal from "./WorkModal";
import { User } from "@prisma/client";

export type WorkData = {
  annictId: number;
  title: string;
  titleKana: string;
  seasonName: string;
  seasonYear: number;
  media: string;
  twitterHashtag: string;
  episodesCount: number;
  image: {
    facebookOgImageUrl: string;
    recommendedImageUrl: string;
  };
  casts: { nodes: { name: string; character: { name: string } }[] };
};

// http://[directory]/img/2022-01-26/imagica_img.jpg not valid in 2022 winter

const WorkCard = ({ work, currentUser }: { work: WorkData; currentUser: User }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  // filling empty image src
  let workUrl = work.image?.facebookOgImageUrl
    ? work.image.facebookOgImageUrl
    : work.image?.recommendedImageUrl
    ? work.image.recommendedImageUrl
    : "/images/cover_replacement.webp";
  // Validate if workUrl starts with http/https
  if (workUrl !== "/images/cover_replacement.webp") {
    if (!workUrl.startsWith("http://") && !workUrl.startsWith("https://")) {
      workUrl = "/images/cover_replacement.webp";
    }
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
          <div className="border-2 border-rose-400 text-rose-400 rounded-2xl px-2 m-1 text-sm">
            {work.seasonYear}
          </div>
          {/* <div className="border-2 border-blue-400 text-blue-400 rounded-2xl px-2 m-1 text-sm"> */}
          <div
            className={`border-2 rounded-2xl px-2 m-1 text-sm ${
              work.seasonName === "WINTER"
                ? "border-winter text-winter"
                : work.seasonName === "SPRING"
                ? "border-spring text-spring"
                : work.seasonName === "SUMMER"
                ? "border-summer text-summer"
                : work.seasonName === "AUTUMN"
                ? "border-autumn text-autumn"
                : null
            }`}
          >
            {work.seasonName}
          </div>
          <div className="border-2 border-yellow-500 text-yellow-500 rounded-2xl px-2 m-1 text-sm">
            {work.media}
          </div>
          {work.twitterHashtag ? (
            <Link
              href={`https://twitter.com/hashtag/${work.twitterHashtag}`}
              target="_blank"
              className="truncate"
            >
              <div className="border-2 border-[#1d9bf0] text-[#1d9bf0] rounded-2xl px-2 m-1 text-sm truncate hover:bg-[#1d9bf0] hover:text-[#fff] duration-300">
                {"#" + work.twitterHashtag}
              </div>
            </Link>
          ) : null}
        </div>
        <h1 className="truncate mx-1">{work.title}</h1>
      </figure>
      {showModal && (
        <WorkModal
          currentUser={currentUser}
          toggleModal={toggleModal}
          work={work}
          srcUrl={srcUrl}
        />
      )}
    </>
  );
};
export default WorkCard;
