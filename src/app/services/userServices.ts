import { endpoints } from "@/config/endpoints";
import { addApiUrl, ApiServices } from "./apiServices";
import { Post } from "./postServices";
import axios, { AxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
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

interface jsonStructure {
  access_token: string;
  token_type: string;
  email: string;
  username: string;
  name: string;
  userId: number;
  isInstitution: boolean;
  cnpj: string;
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

    const config: AxiosRequestConfig = {
      method: "post",
      url: addApiUrl(endpoints.auth),
      responseType: "json",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: (data, headers) => {
        return form_data;
      },
      onUploadProgress: (progressEvent) => {},
      data: form_data,
    };

    // endpoints.auth;
    const response = (await axios.request(config)).data;
    console.log({ response });
    const tokenDecoded = jwtDecode(response.access_token) as jsonStructure;
    console.log("🚀 ~ tokenDecoded:", tokenDecoded);

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
