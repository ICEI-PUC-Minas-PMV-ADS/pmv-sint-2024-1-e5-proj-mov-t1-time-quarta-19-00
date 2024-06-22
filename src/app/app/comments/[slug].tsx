import { ScrollView, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Text, Appbar, Button } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import usePosts from "@/dataHooks/usePosts";
import { Post } from "@/services";

type Props = {};

const PostComments = (props: Props) => {
  const { slug } = useLocalSearchParams();
  const { data } = usePosts(+(slug || 0) || null);
  const post = data as Post;

  const doComment = () => {
    router.replace(`/comments/${post?.id}/new`);
  };

  const goToPosts = () => {
    router.replace("/feed");
  };

  return (
    <SafeAreaView style={styles.containerScrollArea}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goToPosts} />
        <Appbar.Content title={`Comentários do post ${post?.title ?? ""}`} />
      </Appbar.Header>
      <ScrollView style={styles.containerPostText}>
        <Text variant="bodyLarge">
          {post?.comments?.length === 0
            ? "Ainda não fizeram um comentário! \n Seja o primeiro!"
            : ""}
        </Text>
        <Button onPress={doComment}>Adicionar comentário</Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postImage: {
    width: "100%",
    height: 400,
  },
  containerPostText: {
    padding: 16,
  },
  containerScrollArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default PostComments;
