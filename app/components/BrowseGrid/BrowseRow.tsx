import { WorkData } from "@/app/types/types";
import WorkCard from "../Work/WorkCard";

const BrowseRow = ({ works, title }: { works: WorkData[]; title: string }) => {
  return (
    <>
      {works.length !== 0 && (
        <div className="my-3">
          <div className="flex justify-center items-center text-center">
            <div className="text-xl rounded-lg bg-gray-100 dark:bg-zinc-800 w-48 opacity-70 my-2">
              {title}：{works.length}
            </div>
          </div>
          <section className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {works.map((work: WorkData) => {
              return <WorkCard key={work.annictId} work={work} />;
            })}
          </section>
        </div>
      )}
    </>
  );
};

export default BrowseRow;
