// Feed.js
import usePosts from "@/dataHooks/usePosts";
import { logout } from "@/store/features/userSlice";
import { Link, router } from "expo-router";
import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Card,
  Text,
} from "react-native-paper";
import { useDispatch } from "react-redux";

export type PostDTO = {
  id: string;
  text: string;
  imgLink: string;
};

const PostCard = ({ item }: { item?: PostDTO }) => {
  const goToComments = () => {
    router.replace(`/comments/${item?.id}`);
  };

  const goToPost = () => {
    router.replace(`/post/${item?.id}`);
  };

  return (
    <Card>
      <Card.Cover
        source={{
          uri: item?.imgLink.includes("http")
            ? item?.imgLink
            : "https://picsum.photos/700",
        }}
      />
      <Card.Title title={item?.text} subtitle={item?.text.slice(0, 20)} />
      <Card.Actions>
        <Button mode="text" onPress={goToComments}>
          Ver comentários
        </Button>
        <Button mode="contained" onPress={goToPost}>
          Ver tudo
        </Button>
      </Card.Actions>
    </Card>
  );
};

const Feed = () => {
  const { data = [], isLoading, isError, error } = usePosts();
  const dispatch = useDispatch();

  const doLogout = () => {
    dispatch(logout());
    router.push("/");
  };
  return (
    <SafeAreaView style={style.wrapper}>
      <Appbar.Header>
        {/* <Appbar.BackAction /> */}
        <Appbar.Content title="Feed" />
        <Appbar.Action icon="logout" onPress={doLogout} />
      </Appbar.Header>
      <ScrollView style={style.feed}>
        <View style={style.container}>
          {isLoading && <ActivityIndicator animating={true} />}
          {isError && (
            <Text>Houve um erro ao buscar os dados {error.message}</Text>
          )}
          {!isLoading &&
            (data as PostDTO[]).map((post) => {
              return <PostCard item={post} key={post.id} />;
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 16,
    display: "flex",
    gap: 16,
  },
  feed: {
    backgroundColor: "#fff",
  },
  wrapper: {
    flex: 1,

    backgroundColor: "#fff",
  },
});

export default Feed;
