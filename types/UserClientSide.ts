import { User } from "@prisma/client";

export type UserClientSide = Omit<User, "password" | "id">;
