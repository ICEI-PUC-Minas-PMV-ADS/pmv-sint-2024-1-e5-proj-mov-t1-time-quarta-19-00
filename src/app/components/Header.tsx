import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { Appbar, Avatar, Text } from "react-native-paper";
import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";

interface HeaderProps {
  title: string;
  goBack?: string;
  hideUser?: boolean;
}

const Header = ({ title, goBack, hideUser = false }: HeaderProps) => {
  const { loggedIn, username } = useAuth(true);
  return (
    <Appbar.Header>
      {goBack && <Appbar.BackAction onPress={() => router.replace(goBack)} />}
      {title === "Feed" ? (
        <Appbar.Content
          title={
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 36, height: 36, borderRadius: 50 }}
                source={require("../assets/images/icon.png")}
              />
              <Text
                style={{ marginLeft: 8, fontWeight: "bold" }}
                variant="bodyLarge"
              >
                Hub da Solidariedade
              </Text>
            </View>
          }
        />
      ) : (
        <Appbar.Content title={title} />
      )}

      {!hideUser &&
        (loggedIn ? (
          <TouchableOpacity onPress={() => router.push("/user")}>
            <Avatar.Image
              size={40}
              style={{
                backgroundColor: "#ddd",
                marginRight: 8,
              }}
              source={{ uri: `https://robohash.org/${username}?set=set3` }}
            />
          </TouchableOpacity>
        ) : (
          <Appbar.Action icon="login" onPress={() => router.push("/login")} />
        ))}
    </Appbar.Header>
  );
};

export default Header;
