import { endpoints } from "@/config/endpoints";
import { ApiServices } from "./apiServices";
import { User } from "./userServices";

export interface Comment {
  id?: number;
  userId: number;
  comment: string;
  postId: number;
  timeStamp: string;
  user: User;
}

export const commentServices = {
  createComment: async (data: Omit<Comment, "id" | "timeStamp" | "user">) => {
    return (await ApiServices.create(endpoints.comments, data)).data;
  },
  deleteComment: async (commentId: number) => {
    return await ApiServices.delete(endpoints.comments + "/" + commentId);
  },
};
