import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  access_token: string;
  loggedIn: boolean;
  userId: number;
  name: string;
  email: string;
}

const initialState: UserState = {
  access_token: "",
  username: "",
  loggedIn: false,
  userId: 0,
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Omit<UserState, "loggedIn">>) => {
      state.username = action.payload.username;
      state.access_token = action.payload.access_token;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
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
