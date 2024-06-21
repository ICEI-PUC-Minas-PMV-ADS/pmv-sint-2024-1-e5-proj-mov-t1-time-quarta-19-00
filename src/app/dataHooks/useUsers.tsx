import { userServices } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";

const usePosts = (id: number | null = null) => {
  if (id) {
    return useQuery({
      queryKey: ["users", id],
      queryFn: () => userServices.getUserById(id.toString()),
    });
  }

  return useQuery({
    queryKey: ["posts"],
    queryFn: userServices.fetchUsers,
  });
};

export const createUserMutation = () => {
  return useMutation({
    mutationFn: userServices.createUser,
    mutationKey: ["users"],
  });
};

export default usePosts;
