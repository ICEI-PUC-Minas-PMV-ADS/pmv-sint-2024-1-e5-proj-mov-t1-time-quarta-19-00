import { usePostDeleteMutation } from "@/dataHooks/usePosts";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Dialog,
  Divider,
  FAB,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import { Post, UserComplete } from "@/services";
import Header from "@/components/Header";
import useUsers from "@/dataHooks/useUsers";

export type PostDTO = {
  id: string;
  text: string;
  imgLink: string;
};

const PostCard = ({
  item,
  allowDelete,
  onDeletePress,
}: {
  item?: Post;
  allowDelete?: boolean;
  onDeletePress?: () => void;
}) => {
  const goToComments = () => {
    router.replace(`/comments/${item?.id}`);
  };

  const goToPost = () => {
    router.replace(`/post/${item?.id}`);
  };

  return (
    <Card>
      <TouchableOpacity onPress={goToPost}>
        <Card.Cover
          source={{
            uri: item?.imgLink.includes("http")
              ? item?.imgLink
              : "https://picsum.photos/700",
          }}
        />
        <Card.Title title={item?.title} subtitle={item?.text.slice(0, 20)} />
        <Divider style={postStyles.divider} />
      </TouchableOpacity>
      <Card.Content style={postStyles.containerUser}>
        <View style={postStyles.containerButtons}>
          {allowDelete ? (
            <Button icon="delete" mode="text" onPress={onDeletePress}>
              Excluir Post
            </Button>
          ) : (
            <>
              <Button
                style={{
                  flex: 1,
                }}
                icon="comment"
                mode="text"
                onPress={goToComments}
              >
                Comentários
              </Button>
            </>
          )}
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
  const theme = useTheme();
  const { slug: userId, ...params } = useLocalSearchParams();
  const isSettingsActive = params?.settings === "true";
  const {
    data: cUserData,
    refetch,
    isLoading,
    isError,
    error,
  } = useUsers(Number(userId));
  const userData = cUserData as UserComplete;
  const doRefetch = () => {
    refetch();
  };

  const doRegisterPost = () => {
    router.push("/post/new");
  };

  const [postDeleteId, setPostDeleteId] = useState<number | null>(null);

  const doDeletePost = (postId: number) => {
    setPostDeleteId(postId);
  };
  const cleanPostDeleteId = () => {
    setPostDeleteId(null);
  };

  const { mutateAsync } = usePostDeleteMutation();

  const doConfirmDeletePost = async () => {
    if (!postDeleteId) {
      return;
    }

    await mutateAsync(postDeleteId);
    cleanPostDeleteId();
    doRefetch();
  };

  return (
    <SafeAreaView
      style={{ ...style.wrapper, backgroundColor: theme.colors.surface }}
    >
      <Header goBack="/feed" title={`Perfil de ${userData?.name}`} />
      <Portal>
        <Dialog visible={Boolean(postDeleteId)} onDismiss={cleanPostDeleteId}>
          <Dialog.Content>
            <Text>Tem certeza que deseja excluir este post?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={cleanPostDeleteId}>Cancel</Button>
            <Button onPress={doConfirmDeletePost}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ScrollView
        style={{ ...style.feed, backgroundColor: theme.colors.surface }}
      >
        <View style={style.container}>
          <View style={style.containerUserData}>
            <Avatar.Image
              size={120}
              style={{
                backgroundColor: "#ddd",
                marginRight: 8,
              }}
              source={{
                uri: `https://robohash.org/${userData?.username}?set=set3`,
              }}
            />
            <View>
              <View>
                <Text
                  variant="bodyLarge"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {userData?.name} ({userData?.username})
                </Text>
                <Text>{userData?.email}</Text>
                <Text>
                  Posts: {userData?.posts?.length} | Comentários:{" "}
                  {userData?.posts?.length}
                </Text>
              </View>
              {userData?.isInstitution && (
                <Button
                  compact
                  icon="whatsapp"
                  mode="contained"
                  disabled={!userData?.whatsapp}
                  onPress={() =>
                    Linking.openURL(
                      `whatsapp://send?phone=${userData?.whatsapp}`
                    )
                  }
                  style={{
                    marginTop: 16,
                  }}
                >
                  Contatar
                </Button>
              )}
            </View>
          </View>
          <Divider />
          {isLoading && <ActivityIndicator animating={true} />}
          {isError && (
            <>
              <Text>Houve um erro ao buscar os dados {error.message}</Text>
            </>
          )}
          {userData?.posts?.length === 0 && (
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
            userData?.posts.map((post) => {
              return (
                <PostCard
                  allowDelete={isSettingsActive}
                  onDeletePress={() => doDeletePost(post.id as number)}
                  item={post}
                  key={post.id}
                />
              );
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
