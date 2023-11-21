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
import toast from "react-hot-toast";

type WorkModalProps = {
  toggleModal: () => void;
  work: WorkData;
  srcUrl: string | StaticImageData;
};

const WorkModal = ({ toggleModal, work, srcUrl }: WorkModalProps) => {
  return (
    <div
      className="fixed inset-0 w-full h-full z-20 bg-black bg-opacity-50"
      onClick={() => {
        toggleModal();
        toast.remove();
      }}
    >
      <Toaster />
      <div className="relative w-4/5 mx-auto md:w-1/2 xl:w-1/3 my-6">
        <div
          className="relative bg-[#fff] dark:bg-[#0f0f0f] dark:text-[#f1f1f1] rounded-md z-20 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-60 drop-shadow overf low-hidden md:h-72">
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
              <div>
                {work.episodesCount !== 0
                  ? `エピソード：${work.episodesCount}話`
                  : null}
              </div>
            </div>
            {/* cast */}
            <section className="text-left">
              {work.casts?.nodes.map((cast, index) => {
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
            </section>
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
        </div>
      </div>
    </div>
  );
};
export default WorkModal;
