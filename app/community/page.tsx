import Link from "next/link";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

const CommunityPage = async () => {
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    return <h1>no user</h1>;
  }

  return (
    <div>
      <div>All Users</div>
      {users.map((user: User) => {
        return (
          <div key={user.username} className="flex">
            <header>
              <div>Avatar PH</div>
              <Link href={`/community/${user.username}`}>
                <h1>@{user.username}</h1>
              </Link>
            </header>
            <section>
              <div>喜愛數{user.watchedWorks.length}</div>
              <div>正在看{user.watchingWorks.length}</div>

              <div>想看{user.followingWorks.length}</div>
            </section>
          </div>
        );
      })}
    </div>
  );
};
export default CommunityPage;
