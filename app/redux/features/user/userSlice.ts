import { createSlice } from "@reduxjs/toolkit";
import { UserClientSide } from "@/app/types/types";

const initialState: { user: null | UserClientSide } = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAuthenticated: (state, actions) => {
      state.user = actions.payload;
    },
    addCollection: (state, actions) => {
      state.user = actions.payload;
    },
    removeCollection: (state, actions) => {
      state.user = actions.payload;
    },
  },
});

export const { userAuthenticated, addCollection, removeCollection } =
  userSlice.actions;

export default userSlice.reducer;
