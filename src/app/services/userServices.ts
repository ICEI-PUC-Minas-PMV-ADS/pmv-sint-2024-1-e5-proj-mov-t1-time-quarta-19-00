import { endpoints } from "@/config/endpoints";
import { ApiServices } from "./apiServices";

export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  password: string;
}

export const userServices = {
  createUser: async (data: User) => {
    return (await ApiServices.create(endpoints.users, data)).data;
  },
  fetchUsers: async (): Promise<User[]> => {
    return (await ApiServices.search(endpoints.users)).data.reverse();
  },
  getUserById: async (userId: string): Promise<User> => {
    return (await ApiServices.search(`${endpoints.users}/${userId}`)).data;
  },
  authUser: async (
    user: Pick<User, "username" | "password">
  ): Promise<{
    access_token: string;
    token_type: string;
  }> => {
    return (await ApiServices.create(endpoints.auth, user)).data;
  },
};
