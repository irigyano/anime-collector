import Navbar from "@/app/components/Navbar/Navbar";
import { getUserFromSession } from "@/lib/utils";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getUserFromSession();

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
