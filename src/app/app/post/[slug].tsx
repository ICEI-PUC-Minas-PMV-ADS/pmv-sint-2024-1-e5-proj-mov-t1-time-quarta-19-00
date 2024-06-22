import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import usePosts from "@/dataHooks/usePosts";
import { router, useLocalSearchParams } from "expo-router";
import { Appbar, Button, Divider, Text } from "react-native-paper";
import { Post as IPost } from "@/services";

const Post = () => {
  const { slug } = useLocalSearchParams();
  const { data, isLoading } = usePosts(+(slug || 0) || null);
  const castData = data as IPost;

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
          <Text variant="titleLarge">{castData.title}</Text>
          <Text variant="bodyMedium">{castData.text}</Text>
          <Divider style={styles.divider} />
          <Text variant="bodyMedium">Postado por: {castData.user.name}</Text>
          <Text variant="bodyMedium">Email: {castData.user.email}</Text>
          <Text variant="bodyMedium">
            {new Date(castData.timeStamp).toLocaleString()}
          </Text>
          <Button onPress={goToComments} style={{ marginTop: 16 }}>
            Ver comentários
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginVertical: 16,
  },
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
