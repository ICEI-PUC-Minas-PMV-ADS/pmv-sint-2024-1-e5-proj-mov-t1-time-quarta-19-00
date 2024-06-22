import { commentServices } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useCommentCreateMutation = () => {
  return useMutation({
    mutationFn: commentServices.createComment,
    mutationKey: ["comments"],
  });
};
