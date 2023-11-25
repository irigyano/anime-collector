"use client";
import Image from "next/image";
import { WorkData } from "@/app/types/types";
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
import { RemoveScroll } from "react-remove-scroll";

const WorkModal = ({
  work,
  srcUrl,
}: {
  work: WorkData;
  srcUrl: string | StaticImageData;
}) => {
  return (
    <RemoveScroll>
      <div className="mx-4 md:mx-auto md:w-2/3 2xl:w-1/3 my-10">
        <Toaster />
        <div
          className="bg-white dark:bg-zinc-900 rounded-md z-20 h-[85vh] overflow-y-scroll scrollbar-none"
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
          <div className="flex justify-center m-1">
            <TagList work={work} />
          </div>
          <main className="mb-1 text-center">
            {/* title */}
            <div className="flex flex-col justify-center items-center">
              <Link
                className="hover:text-blue-500 duration-300"
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
                  <div className="basis-1/2 flex justify-center truncate">
                    <Link
                      className="hover:text-blue-500 duration-300"
                      target="_blank"
                      href={`https://annict.com/characters/${cast.character.annictId}`}
                    >
                      <div>{cast.character.name}</div>
                    </Link>
                  </div>
                  <div className="basis-1/2 flex justify-center">
                    <Link
                      className="hover:text-blue-500 duration-300"
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
    </RemoveScroll>
  );
};
export default WorkModal;
