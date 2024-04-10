import { getUserFromSession } from "@/lib/getUserAction";

export type User = Awaited<ReturnType<typeof getUserFromSession>>;
