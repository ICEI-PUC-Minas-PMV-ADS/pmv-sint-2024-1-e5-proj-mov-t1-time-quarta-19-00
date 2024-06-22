import { RootState } from "@/store/store";
import { router } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { loggedIn, ...user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!loggedIn) {
      router.replace("/login");
    }
  }, [loggedIn]);

  return user;
};

export default useAuth;
