import Link from "next/link";
import prisma from "@/lib/prisma";
import { UserClientSide } from "@/app/types/types";
import Image from "next/image";

export const metadata = {
  title: "社群動態",
};

const ActivityPage = async () => {
  const activities = await prisma.activity.findMany({
    include: { user: true },
  });

  return (
    <div className="flex flex-wrap justify-center">
      {activities.map(
        (activity) =>
          activity.user.username + activity.action + activity.workTitle
      )}
    </div>
  );
};
export default ActivityPage;
