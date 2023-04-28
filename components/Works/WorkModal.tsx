import Image from "next/image";
import { WorkData } from "./WorkCard";
import Link from "next/link";
import { User } from "@prisma/client";
import { useState } from "react";
import { HiOutlineCheckCircle, HiOutlinePlay, HiOutlineStar } from "react-icons/hi";

type WorkModalProps = {
  toggleModal: () => void;
  work: WorkData;
  srcUrl: string;
  currentUser: User;
};

const WorkModal = ({ toggleModal, work, srcUrl, currentUser }: WorkModalProps) => {
  const [isWatched, setIsWatched] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Check if user stored the work
  if (currentUser) {
    if (currentUser.watchedWorks.includes(work.annictId) && !isWatched) {
      setIsWatched(true);
    }
    if (currentUser.watchingWorks.includes(work.annictId) && !isWatching) {
      setIsWatching(true);
    }
    if (currentUser.followingWorks.includes(work.annictId) && !isFollowing) {
      setIsFollowing(true);
    }
  }

  return (
    <div className="fixed inset-0 w-full h-full z-20 bg-black bg-opacity-50" onClick={toggleModal}>
      <div className="relative w-4/5 mx-auto md:w-1/2 xl:w-1/3 my-6">
        <div
          className="relative bg-[#fff] dark:bg-[#0f0f0f] dark:text-[#f1f1f1] rounded-md z-20 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="relative h-60 drop-shadow overflow-hidden md:h-72">
            <Image src={srcUrl} alt="cover_photo" fill className="object-cover" sizes="640px" />
          </header>
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
            <header>
              <div>{work.title}</div>
              <div>{work.titleKana}</div>
              <div>{work.episodesCount !== 0 ? `エピソード：${work.episodesCount}話` : null}</div>
            </header>
            <section className="text-left">
              {work.casts?.nodes.map((cast, index) => {
                return (
                  <div key={index} className="flex justify-between">
                    <div className="basis-1/2 flex justify-center truncate">
                      <div className="">{cast.character.name}</div>
                    </div>
                    <div className="basis-1/2 flex justify-center">
                      <div className="">{cast.name}</div>
                    </div>
                  </div>
                );
              })}
            </section>
          </main>
          <footer className="flex justify-between">
            {isWatched ? (
              <div className="basis-1/3 flex justify-center items-center duration-300 text-green-500">
                <button
                  onClick={() => {
                    setIsWatched(false);
                  }}
                >
                  <HiOutlineCheckCircle size={30} />
                </button>
              </div>
            ) : (
              <div className="basis-1/3 flex justify-center items-center  ">
                <button
                  className="duration-300 hover:text-green-500"
                  onClick={() => {
                    if (!currentUser) {
                      return console.log("please log in toast");
                    }
                    setIsWatched(true);
                  }}
                >
                  <HiOutlineCheckCircle size={30} />
                </button>
              </div>
            )}

            {isWatching ? (
              <div className="basis-1/3 flex justify-center items-center duration-300 text-blue-500">
                <button
                  onClick={() => {
                    setIsWatching(false);
                  }}
                >
                  <HiOutlinePlay size={30} />
                </button>
              </div>
            ) : (
              <div className="basis-1/3 flex justify-center items-center  ">
                <button
                  className="duration-300 hover:text-blue-500"
                  onClick={() => {
                    if (!currentUser) {
                      return console.log("please log in toast");
                    }
                    setIsWatching(true);
                  }}
                >
                  <HiOutlinePlay size={30} />
                </button>
              </div>
            )}
            {isFollowing ? (
              <div className="basis-1/3 flex justify-center items-center duration-300 text-yellow-500">
                <button
                  onClick={() => {
                    setIsFollowing(false);
                  }}
                >
                  <HiOutlineStar size={30} />
                </button>
              </div>
            ) : (
              <div className="basis-1/3 flex justify-center items-center  ">
                <button
                  className="duration-300 hover:text-yellow-500"
                  onClick={() => {
                    if (!currentUser) {
                      return console.log("please log in toast");
                    }
                    setIsFollowing(true);
                  }}
                >
                  <HiOutlineStar size={30} />
                </button>
              </div>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};
export default WorkModal;
