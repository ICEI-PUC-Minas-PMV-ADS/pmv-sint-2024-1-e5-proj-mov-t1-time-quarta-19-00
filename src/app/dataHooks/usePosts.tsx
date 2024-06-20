import { postServices } from "@/services";
import { useQuery } from "@tanstack/react-query";

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

export default usePosts;
