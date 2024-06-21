import { endpoints } from "@/config/endpoints";
import { ApiServices } from "./apiServices";

export const userServices = {
  createUser: async (data: any) => {
    return (await ApiServices.create(endpoints.users, data)).data;
  },
  fetchUsers: async () => {
    return (await ApiServices.search(endpoints.users)).data.reverse();
  },
  getUserById: async (userId: string) => {
    return (await ApiServices.search(`${endpoints.users}/${userId}`)).data;
  },
};
