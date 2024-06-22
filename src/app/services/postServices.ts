import { endpoints } from "@/config/endpoints";
import { ApiServices } from "./apiServices";
import { User } from "./userServices";
import { Comment } from "./commentServices";

export interface Post {
  id?: number;
  title: string;
  text: string;
  imgLink: string;
  userId: number;
  timeStamp: string;
  user: User;
  comments: Comment[];
}

export const postServices = {
  createPost: async (data: Post) => {
    return (await ApiServices.create(endpoints.posts, data)).data;
  },
  fetchPosts: async () => {
    return (await ApiServices.search(endpoints.posts)).data.reverse() as Post[];
  },
  fetchPostById: async (id: number) => {
    return (await ApiServices.search(endpoints.posts + "/" + id)).data as Post;
  },
};
