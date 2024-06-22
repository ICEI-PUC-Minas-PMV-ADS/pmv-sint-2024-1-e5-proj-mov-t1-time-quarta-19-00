import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  access_token: string;
  loggedIn: boolean;
  userId: number;
  name: string;
  email: string;
  isInstitution: boolean;
  cnpj: string;
}

const initialState: UserState = {
  access_token: "",
  username: "",
  loggedIn: false,
  isInstitution: false,
  userId: 0,
  name: "",
  email: "",
  cnpj: "",
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
      state.isInstitution = action.payload.isInstitution;
      state.cnpj = action.payload.cnpj;

      state.loggedIn = true;
    },
    logout: (state) => {
      state.username = initialState["username"];
      state.access_token = initialState["access_token"];
      state.userId = initialState["userId"];
      state.name = initialState["name"];
      state.email = initialState["email"];
      state.isInstitution = initialState["isInstitution"];
      state.cnpj = initialState["cnpj"];

      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice;
