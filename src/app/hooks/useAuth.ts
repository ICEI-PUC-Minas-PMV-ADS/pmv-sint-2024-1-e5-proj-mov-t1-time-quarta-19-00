import { RootState } from "@/store/store";
import { router } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = (onlyData = false) => {
  const user = useSelector((state: RootState) => state.user);

  if (onlyData) return user;

  useEffect(() => {
    if (!user?.loggedIn) {
      router.replace("/login");
    }
  }, [user?.loggedIn]);

  return user;
};

export default useAuth;
