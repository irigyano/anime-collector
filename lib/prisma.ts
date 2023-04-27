// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || new PrismaClient({ log: ["query"] });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma;

import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

const prisma = globalThis.client || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.client = prisma;

export default prisma;

// import { PrismaClient } from "@prisma/client"

// declare global {
//   var prisma: PrismaClient | undefined
// }

// const client = globalThis.prisma || new PrismaClient()
// if (process.env.NODE_ENV !== "production") globalThis.prisma = client

// export default client
