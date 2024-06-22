import { endpoints } from "@/config/endpoints";
import { ApiServices } from "./apiServices";

export interface Comment {
  id?: number;
  userId: number;
  comment: string;
  postId: number;
  timeStamp: string;
}

export const commentServices = {
  createComment: async (data: Omit<Comment, "id" | "timeStamp">) => {
    return (await ApiServices.create(endpoints.comments, data)).data;
  },
};
