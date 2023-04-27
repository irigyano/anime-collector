import Image from "next/image";
import { WorkData } from "./WorkCard";
import Link from "next/link";

const WorkModal = ({
  toggleModal,
  work,
  srcUrl,
}: {
  toggleModal: () => void;
  work: WorkData;
  srcUrl: string;
}) => {
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
            <div className="border-2 border-green-400 text-green-400 rounded-2xl px-2 m-1 text-sm">
              {work.seasonYear}
            </div>
            <div className="border-2 border-blue-400 text-blue-400 rounded-2xl px-2 m-1 text-sm">
              {work.seasonName}
            </div>
            <div className="border-2 border-blue-700 text-blue-700 rounded-2xl px-2 m-1 text-sm">
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
            <button
              onClick={() => {
                console.log(work.annictId);
              }}
              className="basis-1/3 bg-red-500"
            >
              良い
            </button>
            <button className="basis-1/3 bg-blue-500">見てる</button>
            <button className="basis-1/3 bg-yellow-500">見たい</button>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default WorkModal;
