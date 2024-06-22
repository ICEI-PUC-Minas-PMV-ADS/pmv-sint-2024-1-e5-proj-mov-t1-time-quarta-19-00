import { ScrollView, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import {
  Text,
  Appbar,
  Button,
  List,
  IconButton,
  Dialog,
  Portal,
} from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import usePosts from "@/dataHooks/usePosts";
import { Post } from "@/services";
import { useCommentDeleteMutation } from "@/dataHooks/useComments";
import useAuth from "@/hooks/useAuth";

type Props = {};

const PostComments = (props: Props) => {
  const { slug } = useLocalSearchParams();
  const { data } = usePosts(+(slug || 0) || null);
  const post = data as Post;

  const user = useAuth(true);

  const doComment = () => {
    router.replace(`/comments/${post?.id}/new`);
  };

  const goToPosts = () => {
    router.replace("/feed");
  };

  const [commentIdSelected, setCommentIdSelected] = React.useState<
    number | null
  >(null);

  const doDeleteComment = (id: number) => {
    setCommentIdSelected(id);
  };

  const completeDeleteCommentCancel = () => {
    setCommentIdSelected(null);
  };

  const { mutateAsync } = useCommentDeleteMutation();

  const confirmDeleteComment = async () => {
    if (!commentIdSelected) return;
    await mutateAsync(commentIdSelected);

    completeDeleteCommentCancel();

    router.replace(`/comments/${post?.id}`);
  };

  return (
    <>
      <SafeAreaView style={styles.containerScrollArea}>
        <Appbar.Header>
          <Appbar.BackAction onPress={goToPosts} />
          <Appbar.Content title={`Comentários do post ${post?.title ?? ""}`} />
        </Appbar.Header>

        <ScrollView style={styles.containerPostText}>
          <Portal>
            <Dialog
              visible={Boolean(commentIdSelected)}
              onDismiss={completeDeleteCommentCancel}
            >
              <Dialog.Content>
                <Text>Tem certeza que deseja excluir este comentário?</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={completeDeleteCommentCancel}>Cancel</Button>
                <Button onPress={confirmDeleteComment}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Text variant="bodyLarge">
            {post?.comments?.length === 0
              ? "Ainda não fizeram um comentário! \n Seja o primeiro!"
              : ""}
          </Text>
          <List.Section>
            {post?.comments?.map((comment) => (
              <List.Item
                left={(props) => <List.Icon {...props} icon="account" />}
                right={(props) =>
                  !user.loggedIn ? null : comment.userId === user?.userId ? (
                    <IconButton
                      {...props}
                      icon="delete"
                      onPress={() => doDeleteComment(comment?.id as number)}
                    />
                  ) : null
                }
                key={comment.id}
                title={comment.comment}
                description={
                  comment.user.name +
                  " - " +
                  new Date(comment.timeStamp).toLocaleString()
                }
              />
            ))}
          </List.Section>
          <Button onPress={doComment}>Adicionar comentário</Button>
        </ScrollView>
      </SafeAreaView>
    </>
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
