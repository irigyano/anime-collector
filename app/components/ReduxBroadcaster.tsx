"use client";
import { useEffect } from "react";
import { store } from "../redux/store";
import { userAuthenticated } from "../redux/features/user/userSlice";
import { UserClientSide } from "../types/types";
const ReduxBroadcaster = ({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: UserClientSide | null;
}) => {
  useEffect(() => {
    store.dispatch(userAuthenticated(currentUser));
  }, []);
  return <>{children}</>;
};

export default ReduxBroadcaster;
