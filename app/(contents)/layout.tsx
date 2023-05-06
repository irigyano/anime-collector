import "../globals.css";
import NextAuthSessionProvider from "@/components/providers/NextAuthSessionProvider";
import Navbar from "../../components/Navbar/Navbar";
import getCurrentUser from "./../actions/getCurrentUser";
import { User } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function ContentsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { currentUser: User | null };
}) {
  const currentUser = await getCurrentUser();
  params.currentUser = currentUser;

  return (
    <NextAuthSessionProvider>
      <Navbar currentUser={currentUser} />
      {children}
    </NextAuthSessionProvider>
  );
}
