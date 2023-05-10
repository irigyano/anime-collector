"use client";

import { useRef } from "react";
import { store } from "./store";
import { userAuthenticated } from "./features/user/userSlice";
import { User } from "@prisma/client";

const ReduxPreloader = ({ currentUser }: { currentUser: User | null }) => {
  const isLoaded = useRef(false);
  if (!isLoaded.current) {
    store.dispatch(userAuthenticated(currentUser));
    isLoaded.current = true;
  }
  return null;
};
export default ReduxPreloader;
