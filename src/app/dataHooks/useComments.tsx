import { commentServices } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useCommentCreateMutation = () => {
  return useMutation({
    mutationFn: commentServices.createComment,
    mutationKey: ["comments"],
  });
};

export const useCommentDeleteMutation = () => {
  return useMutation({
    mutationFn: commentServices.deleteComment,
    mutationKey: ["comments"],
  });
};
