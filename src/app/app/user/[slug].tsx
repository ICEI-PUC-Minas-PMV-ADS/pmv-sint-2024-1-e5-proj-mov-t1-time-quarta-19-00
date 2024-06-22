import usePosts from "@/dataHooks/usePosts";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Divider,
  FAB,
  Text,
} from "react-native-paper";
import { Post, UserComplete } from "@/services";
import Header from "@/components/Header";
import useUsers from "@/dataHooks/useUsers";

export type PostDTO = {
  id: string;
  text: string;
  imgLink: string;
};

const PostCard = ({ item }: { item?: Post }) => {
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
      <Divider style={postStyles.divider} />
      <Card.Content style={postStyles.containerUser}>
        <View style={postStyles.containerButtons}>
          <Button icon="comment" mode="text" onPress={goToComments}>
            Comentários
          </Button>
          <Button icon="eye" mode="contained" onPress={goToPost}>
            Ler tudo
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const postStyles = StyleSheet.create({
  containerButtons: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  containerImage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  containerUser: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 8,
  },
  divider: {
    margin: 8,
  },
});

const UserPosts = () => {
  const { data: cData = [], isLoading, isError, error, refetch } = usePosts();
  const data = cData as Post[];
  const { slug: userId } = useLocalSearchParams();
  const { data: cUserData } = useUsers(Number(userId));
  const userData = cUserData as UserComplete;
  const doRefetch = () => {
    refetch();
  };

  const doRegisterPost = () => {
    router.push("/post/new");
  };

  return (
    <SafeAreaView style={style.wrapper}>
      <Header goBack="/feed" title={`Perfil de ${userData.name}`} />
      <ScrollView style={style.feed}>
        <View style={style.container}>
          <View style={style.containerUserData}>
            <Avatar.Image
              size={120}
              style={{
                backgroundColor: "#ddd",
                marginRight: 8,
              }}
              source={{ uri: `https://robohash.org/bla?set=set3` }}
            />
            <View>
              <View>
                <Text
                  variant="bodyLarge"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {userData.name} ({userData.username})
                </Text>
                <Text>{userData.email}</Text>
                <Text>
                  Posts: {userData?.posts?.length} | Comentários:{" "}
                  {userData?.posts?.length}
                </Text>
              </View>
              <Button
                compact
                icon="whatsapp"
                mode="contained"
                style={{
                  marginTop: 16,
                }}
              >
                Contatar
              </Button>
            </View>
          </View>
          <Divider />
          {isLoading && <ActivityIndicator animating={true} />}
          {isError && (
            <>
              <Text>Houve um erro ao buscar os dados {error.message}</Text>
            </>
          )}
          {data?.length === 0 && (
            <View style={style.emptyContainer}>
              <Image
                style={style.emptyImage}
                source={{
                  uri: "https://static.vecteezy.com/system/resources/previews/005/073/059/original/empty-box-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-vector.jpg",
                }}
              />
              <Text>Nenhum post encontrado!</Text>
            </View>
          )}
          {!isLoading &&
            userData.posts.map((post) => {
              return <PostCard item={post} key={post.id} />;
            })}

          <Button onPress={doRefetch}>Recarregar</Button>
        </View>
      </ScrollView>
      <FAB icon="plus" style={style.fab} onPress={doRegisterPost} />
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
  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyImage: {
    width: 120,
    height: 200,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 88,
  },
  containerUserData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default UserPosts;
