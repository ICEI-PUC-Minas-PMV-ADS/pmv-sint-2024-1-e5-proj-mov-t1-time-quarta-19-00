import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  access_token: string;
  loggedIn: boolean;
}

const initialState: UserState = {
  access_token: "",
  username: "",
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<Pick<UserState, "username" | "access_token">>
    ) => {
      state.username = action.payload.username;
      state.access_token = action.payload.access_token;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.username = "";
      state.access_token = "";
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice;
