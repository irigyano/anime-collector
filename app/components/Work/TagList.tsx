import Link from "next/link";
import { WorkData } from "@/app/types/types";

const TagList = ({ work }: { work: WorkData }) => {
  return (
    <>
      {work.seasonYear && (
        <div className="m-1 rounded-2xl border-2 border-rose-400 px-2 text-sm text-rose-400">
          {work.seasonYear}
        </div>
      )}
      {work.seasonName && (
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
          } m-1 rounded-2xl px-2 text-sm`}
        >
          {work.seasonName}
        </div>
      )}
      <div className="m-1 rounded-2xl border-2 border-yellow-500 px-2 text-sm text-yellow-500">
        {work.media}
      </div>
      {work.twitterHashtag && (
        <Link
          href={`https://twitter.com/hashtag/${work.twitterHashtag}`}
          target="_blank"
          className="truncate"
        >
          <div className="m-1 truncate rounded-2xl border-2 border-[#1d9bf0] px-2 text-sm text-[#1d9bf0] duration-300 hover:bg-[#1d9bf0] hover:text-[#fff]">
            {"#" + work.twitterHashtag}
          </div>
        </Link>
      )}
    </>
  );
};

export default TagList;
