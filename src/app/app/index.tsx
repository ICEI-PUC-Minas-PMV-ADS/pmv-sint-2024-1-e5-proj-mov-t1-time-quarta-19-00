import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Redirect } from "expo-router";

const SwitchFeedAndLogin = () => {
  const { loggedIn } = useSelector((state: RootState) => state.user);

  if (loggedIn) {
    return <Redirect href="/feed" />;
  }

  return <Redirect href="/login" />;
};

export default SwitchFeedAndLogin;
