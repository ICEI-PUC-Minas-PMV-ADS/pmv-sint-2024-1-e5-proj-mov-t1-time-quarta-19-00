import { userServices } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUsers = (id: number | null = null) => {
  if (id) {
    return useQuery({
      queryKey: ["users", id],
      queryFn: () => userServices.getUserById(id.toString()),
    });
  }

  return useQuery({
    queryKey: ["users"],
    queryFn: userServices.fetchUsers,
  });
};

export const createUserMutation = () => {
  return useMutation({
    mutationFn: userServices.createUser,
    mutationKey: ["users"],
  });
};

export const userAuthMutation = () => {
  return useMutation({
    mutationFn: userServices.authUser,
    mutationKey: ["users", "authUsers"],
  });
};

export default useUsers;
