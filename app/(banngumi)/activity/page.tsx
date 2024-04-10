import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Metadata } from "next";
import ActivityCard from "@/components/ActivityCard";
import type { Work } from "@/types/work";

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
    take: -30,
  });
  filterAndReverse(activities);

  const requestingWorks = activities
    .map((activity) => activity.workId)
    .join(",");
  const res = await fetch(
    `${process.env.HOST_URL}/api/search/id?id=${requestingWorks}`,
  );
  const works: Work[] = await res.json();

  return (
    <div className="flex justify-center py-6">
      <ul className="flex flex-col gap-6 px-4">
        {activities.map((activity) => (
          <ActivityCard
            activity={activity}
            key={activity.id}
            work={works.find((e) => e.annictId === activity.workId)!}
          />
        ))}
      </ul>
    </div>
  );
};
export default ActivityPage;
