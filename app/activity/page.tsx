import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Metadata } from "next";
import ActivityCard from "../components/ActivityCard";

export const metadata: Metadata = {
  title: "社群動態",
  description: "check out the weebs",
};

type ActivityWithUser = Prisma.ActivityGetPayload<{ include: { user: true } }>;

function filterAndReverse(activities: ActivityWithUser[]) {
  // in place action
  for (let i = activities.length - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      const current = activities[i];
      const compare = activities[j];
      if (
        current.userId === compare.userId &&
        current.workId === compare.workId &&
        current.action === compare.action
      ) {
        activities.splice(j, 1);
        break;
      }
    }
  }
  activities.reverse();
}

const ActivityPage = async () => {
  const activities = await prisma.activity.findMany({
    orderBy: [{ createdAt: "asc" }],
    include: { user: true },
  });
  filterAndReverse(activities);

  return (
    <div className="flex justify-center">
      <ul
        aria-label="Colored activity feed"
        role="feed"
        className="relative flex flex-col gap-12 py-12 pl-8 before:absolute before:top-0 before:left-8 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-8 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200"
      >
        {activities.map((activity: ActivityWithUser) => (
          <ActivityCard activity={activity} key={activity.id} />
        ))}
      </ul>
    </div>
  );
};
export default ActivityPage;
