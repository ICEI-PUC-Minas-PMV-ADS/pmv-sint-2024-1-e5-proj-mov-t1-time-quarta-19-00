import { RootState } from "@/store/store";
import { router } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = (onlyData = false) => {
  const user = useSelector((state: RootState) => state.user);
  const redirectToLogin = () => {
    router.replace("/login");
  };

  if (onlyData) return { ...user, redirectToLogin };

  useEffect(() => {
    if (!user?.loggedIn) {
      router.replace("/login");
    }
  }, [user?.loggedIn]);

  return { ...user, redirectToLogin };
};

export default useAuth;
