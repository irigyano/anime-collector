"use client";
import Image from "next/image";
import type { Work } from "@/types/work";
import Link from "next/link";
import {
  HiOutlineCheckCircle,
  HiOutlinePlay,
  HiOutlineStar,
} from "react-icons/hi";
import { Toaster } from "react-hot-toast";
import CollectionButton from "./CollectionButton";
import type { StaticImageData } from "next/image";
import TagList from "../TagList";
import CommentTextarea from "./CommentTextarea";
import { RxCross2 } from "react-icons/rx";

const WorkModal = ({
  work,
  srcUrl,
  toggleModal,
}: {
  work: Work;
  srcUrl: string | StaticImageData;
  toggleModal: () => void;
}) => {
  return (
    <>
      <Toaster position="bottom-center" />
      <div className="relative mx-4 my-10 md:mx-auto md:w-2/3 2xl:w-1/3">
        <button
          onClick={toggleModal}
          className="absolute right-2 top-2 z-20 flex justify-end"
        >
          <RxCross2 size={25} />
        </button>
        <div
          className="z-20 h-[85svh] overflow-y-scroll overscroll-none rounded-md bg-white scrollbar-none dark:bg-zinc-900 "
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="relative h-40 lg:h-80">
            <Image
              src={srcUrl}
              alt="cover_photo"
              fill
              className="object-cover"
              sizes="640px"
            />
          </div>
          <div className="m-1 flex justify-center">
            <TagList work={work} />
          </div>
          <main className="mb-1 text-center">
            {/* title */}
            <div className="flex flex-col items-center justify-center">
              <Link
                className="duration-300 hover:text-blue-500"
                target="_blank"
                href={`https://annict.com/works/${work.annictId}`}
              >
                <div>{work.title}</div>
                <div>{work.titleKana}</div>
              </Link>
              {work.episodesCount !== 0 && (
                <div>集數：{work.episodesCount}話</div>
              )}
            </div>
            {work.casts.nodes.map((cast, index) => {
              return (
                <div key={index} className="flex justify-between">
                  <div className="flex basis-1/2 justify-center truncate">
                    <Link
                      className="duration-300 hover:text-blue-500"
                      target="_blank"
                      href={`https://annict.com/characters/${cast.character.annictId}`}
                    >
                      <div>{cast.character.name}</div>
                    </Link>
                  </div>
                  <div className="flex basis-1/2 justify-center">
                    <Link
                      className="duration-300 hover:text-blue-500"
                      target="_blank"
                      href={`https://annict.com/people/${cast.person.annictId}`}
                    >
                      <div>{cast.name}</div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </main>

          <footer className="flex justify-between">
            <CollectionButton
              work={work}
              category={"followingWorks"}
              color={"text-yellow-500"}
              hoverColor={"hover:text-yellow-500"}
            >
              <HiOutlineStar size={30} />
              <span>追蹤</span>
            </CollectionButton>
            <CollectionButton
              work={work}
              category={"watchingWorks"}
              color={"text-blue-500"}
              hoverColor={"hover:text-blue-500"}
            >
              <HiOutlinePlay size={30} />
              <span>正在看</span>
            </CollectionButton>
            <CollectionButton
              work={work}
              category={"finishedWorks"}
              color={"text-green-500"}
              hoverColor={"hover:text-green-500"}
            >
              <HiOutlineCheckCircle size={30} />
              <span>看完</span>
            </CollectionButton>
          </footer>
          <CommentTextarea work={work} />
        </div>
      </div>
    </>
  );
};
export default WorkModal;
