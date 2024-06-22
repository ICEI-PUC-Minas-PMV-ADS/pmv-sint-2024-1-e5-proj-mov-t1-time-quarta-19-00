import { postServices } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";

const usePosts = (id: number | null = null) => {
  if (id) {
    return useQuery({
      queryKey: ["posts", id],
      queryFn: () => postServices.fetchPostById(id),
    });
  }

  return useQuery({
    queryKey: ["posts"],
    queryFn: postServices.fetchPosts,
  });
};

export const usePostCreateMutation = () => {
  return useMutation({
    mutationFn: postServices.createPost,
    mutationKey: ["posts"],
  });
};

export default usePosts;
