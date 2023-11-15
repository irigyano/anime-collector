import Link from "next/link";
import { WorkData } from "@/app/types/types";

const TagList = ({ work }: { work: WorkData }) => {
  return (
    <>
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
    </>
  );
};

export default TagList;
