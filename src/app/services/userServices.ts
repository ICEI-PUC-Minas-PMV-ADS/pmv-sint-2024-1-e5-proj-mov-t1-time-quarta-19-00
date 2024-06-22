import { endpoints } from "@/config/endpoints";
import { ApiServices } from "./apiServices";
import { Post } from "./postServices";

export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  password: string;
  isInstitution: boolean;
  cnpj?: string;
}

export interface UserComplete extends User {
  posts: Post[];
}

export const userServices = {
  createUser: async (data: User) => {
    return (await ApiServices.create(endpoints.users, data)).data;
  },
  fetchUsers: async (): Promise<User[]> => {
    return (await ApiServices.search(endpoints.users)).data.reverse();
  },
  getUserById: async (userId: string): Promise<UserComplete> => {
    return (await ApiServices.search(`${endpoints.users}/${userId}`)).data;
  },
  authUser: async (
    user: Pick<User, "username" | "password">
  ): Promise<{
    access_token: string;
    token_type: string;
    email: string;
    username: string;
    name: string;
    userId: number;
    isInstitution: boolean;
    cnpj: string;
  }> => {
    const form_data = new FormData();
    form_data.append("username", user.username);
    form_data.append("password", user.password);

    const response = (await ApiServices.create(endpoints.auth, form_data)).data;

    const tokenDecoded = JSON.parse(atob(response.access_token.split(".")[1]));

    return {
      access_token: response.access_token,
      token_type: tokenDecoded.token_type,
      email: tokenDecoded.email,
      username: tokenDecoded.username,
      name: tokenDecoded.name,
      userId: tokenDecoded.userId,
      isInstitution: tokenDecoded.isInstitution,
      cnpj: tokenDecoded.cnpj,
    };
  },
};
