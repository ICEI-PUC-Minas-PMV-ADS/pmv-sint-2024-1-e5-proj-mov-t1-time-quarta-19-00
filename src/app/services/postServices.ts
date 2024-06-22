import { endpoints } from "@/config/endpoints";
import { ApiServices } from "./apiServices";
import { User } from "./userServices";
import { Comment } from "./commentServices";
import { PostLike } from "./postLikeServices";

export interface Post {
  id?: number;
  title: string;
  text: string;
  imgLink: string;
  userId: number;
  timeStamp: string;
  user: User;
  comments: Comment[];
  likes: PostLike[];
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
  deletePostById: async (postId: number) => {
    return (await ApiServices.delete(endpoints.posts + "/" + postId)).data;
  },
  updatePostById: async (data: Post) => {
    return (await ApiServices.update(endpoints.posts + "/" + data.id, data))
      .data;
  },
};
