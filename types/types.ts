import { User } from "@prisma/client";

export type UserClientSide = Omit<User, "name" | "email" | "emailVerified">;

export type ServerProps = {
  params: { username: string };
  searchParams: { [key: string]: string | undefined };
};
