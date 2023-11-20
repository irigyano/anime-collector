import { UserClientSide, WorkData } from "@/app/types/types";
import WorkCard from "../Work/WorkCard";
import ReduxBroadcaster from "../ReduxBroadcaster";

const WorkGrid = ({
  workData,
  currentUser,
}: {
  workData: WorkData[];
  currentUser: UserClientSide | null;
}) => {
  return (
    <ReduxBroadcaster currentUser={currentUser}>
      <section className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {workData.map((work) => {
          return <WorkCard key={work.annictId} work={work} />;
        })}
      </section>
    </ReduxBroadcaster>
  );
};

export default WorkGrid;
