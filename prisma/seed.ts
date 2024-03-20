import { PrismaClient } from "@prisma/client";
import {
  seedUsers,
  seedWorks,
  generateRandomDateWithinPastMonth,
} from "./seedData";
const prisma = new PrismaClient();

async function main() {
  seedUsers.map(async ({ username, image }) => {
    const { id } = await prisma.user.upsert({
      where: { username },
      update: {},
      create: {
        username,
        image,
      },
    });

    for (let i = 0; i < Math.ceil(Math.random() * 7 + 3); i++) {
      const { workId, workTitle } =
        seedWorks[Math.floor(Math.random() * seedWorks.length)];
      await prisma.activity.create({
        data: {
          userId: id,
          workId,
          workTitle,
          action: "FINISH",
          createdAt: generateRandomDateWithinPastMonth(),
        },
      });

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          finishedWorks: { push: workId },
        },
      });
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
