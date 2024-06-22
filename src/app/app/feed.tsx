// Feed.js
import usePosts from "@/dataHooks/usePosts";
import { logout } from "@/store/features/userSlice";
import { RootState } from "@/store/store";
import { Link, router } from "expo-router";
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  FAB,
  Text,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "@/services";
import Header from "@/components/Header";
import useAuth from "@/hooks/useAuth";

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
        <TouchableOpacity onPress={() => router.push(`/user/${item?.user.id}`)}>
          <View style={postStyles.containerImage}>
            <Image
              source={{
                uri: `https://robohash.org/${item?.user.name}?set=set3`,
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                backgroundColor: "#ddd",
              }}
            />
            <View>
              <Text>{item?.user.name}</Text>
              <Text>{item?.user.email}</Text>
            </View>
          </View>
        </TouchableOpacity>
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
    justifyContent: "space-between",
    gap: 8,
    marginTop: 8,
  },
  divider: {
    margin: 8,
  },
});

const Feed = () => {
  const { data: cData = [], isLoading, isError, error, refetch } = usePosts();
  const data = cData as Post[];

  const { isInstitution } = useAuth(true);
  const doRefetch = () => {
    refetch();
  };

  const doRegisterPost = () => {
    router.push("/post/new");
  };

  return (
    <SafeAreaView style={style.wrapper}>
      <Header title="Feed" />
      <ScrollView style={style.feed}>
        <View style={style.container}>
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
            data.map((post) => {
              return <PostCard item={post} key={post.id} />;
            })}

          <Button onPress={doRefetch}>Recarregar</Button>
        </View>
      </ScrollView>
      {isInstitution && (
        <FAB icon="plus" style={style.fab} onPress={doRegisterPost} />
      )}
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
});

export default Feed;
