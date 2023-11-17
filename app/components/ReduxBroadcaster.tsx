"use client";
import { useEffect, useRef } from "react";
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
  // const userRef = useRef(currentUser);
  useEffect(() => {
    store.dispatch(userAuthenticated(currentUser));
  }, []);
  return <>{children}</>;
};

export default ReduxBroadcaster;
