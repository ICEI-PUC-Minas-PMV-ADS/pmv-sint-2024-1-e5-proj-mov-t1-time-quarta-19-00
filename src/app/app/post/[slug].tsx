import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import usePosts from "@/dataHooks/usePosts";
import { Link, router, useLocalSearchParams } from "expo-router";
import { PostDTO } from "../feed";
import { Appbar, Button, Text } from "react-native-paper";

const Post = () => {
  const { slug } = useLocalSearchParams();
  const { data, isLoading } = usePosts(+(slug || 0) || null);
  const castData = data as PostDTO;

  if (isLoading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const goToPosts = () => {
    router.replace("/feed");
  };

  const goToComments = () => {
    router.replace(`/comments/${castData?.id}`);
  };

  return (
    <SafeAreaView style={styles.containerScrollArea}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goToPosts} />
        <Appbar.Content title={`Post ${castData?.id ?? ""}`} />
      </Appbar.Header>
      <ScrollView>
        <Image
          style={styles.postImage}
          source={{
            uri: castData?.imgLink.includes("http")
              ? castData?.imgLink
              : "https://picsum.photos/700",
          }}
        />
        <View style={styles.containerPostText}>
          <Text variant="titleLarge">Título do Post {castData.id}</Text>
          <Text variant="bodyMedium">{castData.text}</Text>
          <Button onPress={goToComments}>Ver comentários</Button>
        </View>
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

export default Post;
