"use client";
import Image from "next/image";
import { WorkData } from "./WorkCard";
import Link from "next/link";
import { User } from "@prisma/client";
import { useState } from "react";
import { HiOutlineCheckCircle, HiOutlinePlay, HiOutlineStar } from "react-icons/hi";
import { Toaster } from "react-hot-toast";
import TruthyButton from "./TruthyButton";
import FalsyButton from "./FalsyButton";

type WorkModalProps = {
  toggleModal: () => void;
  work: WorkData;
  srcUrl: string;
  currentUser: User | null;
};

const WorkModal = ({ toggleModal, work, srcUrl, currentUser }: WorkModalProps) => {
  const [isWatched, setIsWatched] = useState(
    currentUser ? currentUser.watchedWorks.includes(work.annictId) : false
  );
  const [isWatching, setIsWatching] = useState(
    currentUser ? currentUser.watchingWorks.includes(work.annictId) : false
  );
  const [isFollowing, setIsFollowing] = useState(
    currentUser ? currentUser.followingWorks.includes(work.annictId) : false
  );

  return (
    <div className="fixed inset-0 w-full h-full z-20 bg-black bg-opacity-50" onClick={toggleModal}>
      <Toaster />
      <div className="relative w-4/5 mx-auto md:w-1/2 xl:w-1/3 my-6">
        <div
          className="relative bg-[#fff] dark:bg-[#0f0f0f] dark:text-[#f1f1f1] rounded-md z-20 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-60 drop-shadow overflow-hidden md:h-72">
            <Image src={srcUrl} alt="cover_photo" fill className="object-cover" sizes="640px" />
          </div>
          <div className="flex justify-center m-1">
            <div className="border-2 border-rose-400 text-rose-400 rounded-2xl px-2 m-1 text-sm">
              {work.seasonYear}
            </div>
            <div
              className={`border-2 ${
                work.seasonName === "WINTER"
                  ? "border-winter text-winter"
                  : work.seasonName === "SPRING"
                  ? "border-spring text-spring"
                  : work.seasonName === "SUMMER"
                  ? "border-summer text-summer"
                  : work.seasonName === "AUTUMN"
                  ? "border-autumn text-autumn"
                  : null
              } rounded-2xl px-2 m-1 text-sm`}
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

          <main className="mb-1 text-center">
            <div className="flex flex-col justify-center items-center">
              <Link
                className="hover:text-blue-500 duration-300"
                target="_blank"
                href={`https://annict.com/works/${work.annictId}`}
              >
                <div>{work.title}</div>
                <div>{work.titleKana}</div>
              </Link>
              <div>{work.episodesCount !== 0 ? `エピソード：${work.episodesCount}話` : null}</div>
            </div>
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
            {isWatched ? (
              <TruthyButton
                text={"看過"}
                workId={work.annictId}
                color={"text-green-500"}
                category={"watchedWorks"}
                stateSetter={setIsWatched}
                icon={<HiOutlineCheckCircle size={30} />}
              />
            ) : (
              <FalsyButton
                text={"看過"}
                category={"watchedWorks"}
                workId={work.annictId}
                color={"hover:text-green-500"}
                currentUser={currentUser}
                stateSetter={setIsWatched}
                icon={<HiOutlineCheckCircle size={30} />}
              />
            )}

            {isWatching ? (
              <TruthyButton
                text={"正在看"}
                workId={work.annictId}
                color={"text-blue-500"}
                category={"watchingWorks"}
                stateSetter={setIsWatching}
                icon={<HiOutlinePlay size={30} />}
              />
            ) : (
              <FalsyButton
                text={"正在看"}
                category={"watchingWorks"}
                workId={work.annictId}
                color={"hover:text-blue-500"}
                currentUser={currentUser}
                stateSetter={setIsWatching}
                icon={<HiOutlinePlay size={30} />}
              />
            )}
            {isFollowing ? (
              <TruthyButton
                text={"關注"}
                workId={work.annictId}
                category={"followingWorks"}
                color={"text-yellow-500"}
                stateSetter={setIsFollowing}
                icon={<HiOutlineStar size={30} />}
              />
            ) : (
              <FalsyButton
                text={"關注"}
                category={"followingWorks"}
                workId={work.annictId}
                color={"hover:text-yellow-500"}
                currentUser={currentUser}
                stateSetter={setIsFollowing}
                icon={<HiOutlineStar size={30} />}
              />
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};
export default WorkModal;
