import { endpoints } from "@/config/endpoints";
import { ApiServices } from "./apiServices";

export const postServices = {
  createPost: async (data: any) => {
    return (await ApiServices.create(endpoints.posts, data)).data;
  },
  fetchPosts: async () => {
    return (await ApiServices.search(endpoints.posts)).data.reverse();
  },
  fetchPostById: async (id: number) => {
    return (await ApiServices.search(endpoints.posts + "/" + id)).data;
  },
};
