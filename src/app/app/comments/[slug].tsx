import { ScrollView, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import usePosts from "@/dataHooks/usePosts";
import { PostDTO } from "../feed";

type Props = {};

const PostComments = (props: Props) => {
  const { slug } = useLocalSearchParams();
  const { data } = usePosts(+(slug || 0) || null);
  const castData = data as PostDTO;

  const goToPosts = () => {
    router.replace("/feed");
  };

  return (
    <SafeAreaView style={styles.containerScrollArea}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goToPosts} />
        <Appbar.Content title={`Comentários do post ${castData?.id ?? ""}`} />
      </Appbar.Header>
      <ScrollView style={styles.containerPostText}>
        <Text>PostComments</Text>
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
