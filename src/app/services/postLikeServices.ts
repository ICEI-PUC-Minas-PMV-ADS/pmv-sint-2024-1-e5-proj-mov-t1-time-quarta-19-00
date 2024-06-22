import { endpoints } from "@/config/endpoints";
import { ApiServices } from "./apiServices";

export interface PostLike {
  id?: number;
  userId: number;
  postId: number;
}

export const postLikeServices = {
  createPostLike: async (data: PostLike) => {
    return (await ApiServices.create(endpoints.postLikes, data)).data;
  },
  deletePostLikeById: async (postLikeId: number) => {
    return (await ApiServices.delete(endpoints.postLikes + "/" + postLikeId))
      .data;
  },
};
