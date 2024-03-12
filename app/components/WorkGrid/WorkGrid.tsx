import { WorkData } from "@/app/types/types";
import WorkCard from "../Work/WorkCard";

const WorkGrid = ({ workData }: { workData: WorkData[] }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {workData.map((work) => {
        return <WorkCard key={work.annictId} work={work} />;
      })}
    </section>
  );
};

export default WorkGrid;
