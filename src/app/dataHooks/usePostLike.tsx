import { postLikeServices, postServices } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePostLikeCreateMutation = () => {
  return useMutation({
    mutationFn: postLikeServices.createPostLike,
    mutationKey: ["postLikes"],
  });
};

export const usePostLikeDeleteMutation = () => {
  return useMutation({
    mutationFn: postLikeServices.deletePostLikeById,
    mutationKey: ["posts"],
  });
};
