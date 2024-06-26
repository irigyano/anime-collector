import { getUserFromSession } from "@/lib/utils";
import { redirect } from "next/navigation";
import { LandingLogin } from "@/components/LandingLogin";
import Image from "next/image";

const LandingPage = async () => {
  const currentUser = await getUserFromSession();

  if (currentUser) return redirect("/home");

  return (
    <>
      <div className="relative flex h-[100dvh] flex-col px-[10%]">
        <div className="absolute left-0 top-0 -z-30 h-full w-full">
          <Image
            className="h-full w-full object-cover opacity-5"
            // Yoink
            priority
            alt="netflix-bg"
            fill
            src={"/images/yoink.jpg"}
          ></Image>
        </div>
        <div className="flex flex-1 ">
          <div className="hidden flex-1 flex-col items-center justify-center gap-4 p-4 sm:flex">
            <div className="text-4xl font-extrabold">Anime Collector</div>
            <span>將您的觀影清單在此集中管理，不再迷失於 OTT 森林之中。</span>
            <Image
              className="fixed bottom-0 left-0 -z-30 object-cover opacity-5"
              src={"/images/Chad.jpg"}
              alt="chad"
              height={740}
              width={600}
            ></Image>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <LandingLogin />
          </div>
        </div>
        <footer className="flex justify-center gap-2 pb-1 text-xs text-muted-foreground">
          <div>© 2024</div>
          <div>Powered by Annict.com</div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
