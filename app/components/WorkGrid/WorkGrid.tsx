import WorkCard from "../Work/WorkCard";
import type { Work } from "@/types/work";

const WorkGrid = ({ workData }: { workData: Work[] }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {workData.map((work) => {
        return <WorkCard key={work.annictId} work={work} />;
      })}
    </section>
  );
};

export default WorkGrid;
