// Feed.js
import usePosts from "@/dataHooks/usePosts";
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
  Icon,
  Text,
  useTheme,
} from "react-native-paper";
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => router.push(`/user/${item?.user.id}`)}>
          <View
            style={{
              ...postStyles.containerImage,
              padding: 14,
            }}
          >
            <Image
              source={{
                uri: `https://robohash.org/${item?.user.username}?set=set3`,
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
        <View
          style={{
            marginHorizontal: 16,
            display: "flex",
            flexDirection: "row",
            gap: 8,

            alignItems: "center",
          }}
        >
          <Icon color={"#fd7070"} source="heart" size={20} />
          <Text>{item?.likes?.length}</Text>
          <Text>|</Text>
          <Icon color={"#8cbcd3"} source="comment" size={20} />
          <Text>{item?.comments?.length} </Text>
        </View>
      </View>
      <TouchableOpacity onPress={goToPost}>
        <Card.Cover
          source={{
            uri: item?.imgLink.includes("http")
              ? item?.imgLink
              : "https://picsum.photos/700",
          }}
        />
        <Card.Title title={item?.title} subtitle={item?.text.slice(0, 20)} />
      </TouchableOpacity>
      <Divider style={postStyles.divider} />
      <Card.Content style={postStyles.containerUser}>
        <View style={postStyles.containerButtons}>
          <Button
            style={{
              flex: 1,
            }}
            icon="comment"
            mode="text"
            onPress={goToComments}
          >
            Ler Comentários
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
    justifyContent: "space-between",
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
    flexDirection: "column",
    gap: 8,
    marginTop: 8,
  },
  divider: {
    margin: 8,
  },
});

const Feed = () => {
  const theme = useTheme();

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
    <SafeAreaView
      style={{ ...style.wrapper, backgroundColor: theme.colors.surface }}
    >
      <Header title="Feed" />
      <ScrollView
        style={{ ...style.feed, backgroundColor: theme.colors.surface }}
      >
        <View style={style.container}>
          {isLoading && <ActivityIndicator animating={true} />}
          {isError && (
            <>
              <Text>Houve um erro ao buscar os dados {error.message}</Text>
            </>
          )}
          {!isLoading && data?.length === 0 && (
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
