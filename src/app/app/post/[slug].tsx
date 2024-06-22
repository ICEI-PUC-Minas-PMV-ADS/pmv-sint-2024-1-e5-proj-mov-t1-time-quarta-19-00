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
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  usePostLikeCreateMutation,
  usePostLikeDeleteMutation,
} from "@/dataHooks/usePostLike";
import useAuth from "@/hooks/useAuth";

const Post = () => {
  const { slug } = useLocalSearchParams();
  const { data, isLoading, refetch } = usePosts(+(slug || 0) || null);
  const castData = data as IPost;
  const { userId, loggedIn, redirectToLogin } = useAuth(true);

  const { mutateAsync: createPostLike } = usePostLikeCreateMutation();
  const { mutateAsync: deletePostLike } = usePostLikeDeleteMutation();
  const userLikedPost = castData?.likes.some((like) => like.userId === userId);
  const addOrRemoveLike = async () => {
    if (!loggedIn) {
      redirectToLogin();
    }
    try {
      if (userLikedPost) {
        const likeId = castData?.likes.find(
          (like) => like.userId === userId
        )?.id;
        await deletePostLike(likeId as number);
        return;
      }

      await createPostLike({
        postId: castData?.id as number,
        userId,
      });
    } finally {
      refetch();
    }
  };

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

  const goToEditPost = () => {
    router.replace(`/post/new?editPost=${castData?.id}`);
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
          <View style={styles.containerUser}>
            <View>
              <TouchableOpacity
                onPress={() => router.push(`/user/${castData?.user.id}`)}
              >
                <View style={styles.containerUserCard}>
                  <Image
                    source={{
                      uri: `https://robohash.org/${castData?.user.name}?set=set3`,
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      backgroundColor: "#ddd",
                    }}
                  />
                  <View>
                    <Text>{castData?.user.name}</Text>
                    <Text>{castData?.user.email}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text variant="bodyMedium">
                Postado por: {castData.user.name}
              </Text>
              <Text variant="bodyMedium">Email: {castData.user.email}</Text>
              <Text variant="bodyMedium">
                {new Date(castData.timeStamp).toLocaleString()}
              </Text>
            </View>
          </View>
          <Button
            icon="pencil"
            mode="contained-tonal"
            onPress={goToEditPost}
            style={{ marginTop: 16 }}
          >
            Editar post
          </Button>
          <Button
            icon="comment"
            mode="contained-tonal"
            onPress={goToComments}
            style={{ marginTop: 16 }}
          >
            Ver comentários
          </Button>
          <Button
            icon="heart"
            mode={userLikedPost ? "contained" : "contained-tonal"}
            onPress={addOrRemoveLike}
            style={{ marginTop: 16 }}
          >
            Gostei
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
  containerUser: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerUserCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
});

export default Post;
