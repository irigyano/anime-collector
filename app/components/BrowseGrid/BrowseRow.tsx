"use client";
import { useEffect } from "react";
import { store } from "../../redux/store";
import { userAuthenticated } from "../../redux/features/user/userSlice";
import { UserClientSide, WorkData } from "@/app/types/types";
import WorkCard from "../Work/WorkCard";

const BrowseRow = ({
  works,
  title,
  currentUser,
}: {
  works: WorkData[];
  title: string;
  currentUser: UserClientSide;
}) => {
  useEffect(() => {
    store.dispatch(userAuthenticated(currentUser));
  }, []);
  return (
    <>
      {works.length !== 0 && (
        <div className="my-3">
          <div className="flex justify-center items-center text-center">
            <div className="text-xl rounded-lg bg-gray-100 dark:bg-zinc-800 w-48 opacity-70 my-2">
              {title}：{works.length}
            </div>
          </div>
          <section className="flex lg:flex-wrap lg:overflow-visible lg:justify-center overflow-x-auto">
            {works.map((work: WorkData) => {
              return (
                <div key={work.annictId}>
                  <WorkCard work={work} />
                </div>
              );
            })}
          </section>
        </div>
      )}
    </>
  );
};

export default BrowseRow;
