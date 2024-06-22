import { View, StyleSheet } from "react-native";
import React from "react";
import Header from "@/components/Header";
import { Avatar, Button, Text, useTheme } from "react-native-paper";
import useAuth from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/userSlice";
import { router } from "expo-router";

const User = () => {
  const theme = useTheme();
  const { username, ...user } = useAuth();

  const dispatch = useDispatch();

  const doLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.surface }}
    >
      <Header goBack="/feed" hideUser title="Usuário" />
      <View style={styles.wrapper}>
        <View style={styles.containerUser}>
          <Avatar.Image
            size={140}
            style={{
              backgroundColor: "#ddd",
              marginRight: 8,
            }}
            source={{ uri: `https://robohash.org/${username}?set=set3` }}
          />
          <View>
            <Text variant="bodyLarge">{username}</Text>
            <Text variant="bodyLarge" style={styles.bold}>
              {user.name}
            </Text>
            <Text variant="bodyLarge">{user.email}</Text>
          </View>
        </View>
        {user.isInstitution && (
          <>
            <Button
              icon="post"
              mode="contained-tonal"
              onPress={() => router.replace(`/user/${user.userId}`)}
            >
              Meus Posts
            </Button>
            <Button
              icon="cog"
              mode="contained-tonal"
              onPress={() =>
                router.replace(`/user/${user.userId}?settings=true`)
              }
            >
              Configurações
            </Button>
          </>
        )}
        <Button icon="logout" mode="contained-tonal" onPress={doLogout}>
          Sair
        </Button>
        <Button
          icon="arrow-left"
          mode="contained-tonal"
          onPress={() => router.replace("/feed")}
        >
          Voltar para o feed
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  bold: {
    fontWeight: "bold",
  },
  containerUser: {
    marginTop: 32,
    padding: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  wrapper: {
    padding: 16,
    display: "flex",
    gap: 16,
  },
});

export default User;
