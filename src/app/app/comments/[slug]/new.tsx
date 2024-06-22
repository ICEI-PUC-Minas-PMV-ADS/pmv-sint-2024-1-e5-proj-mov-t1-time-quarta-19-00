import ErrorMessage from "@/components/ErrorMessage";
import { useCommentCreateMutation } from "@/dataHooks/useComments";
import usePosts from "@/dataHooks/usePosts";
import useAuth from "@/hooks/useAuth";
import { Post } from "@/services";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";

type Props = {};

export const New = (props: Props) => {
  const { userId } = useAuth();
  const { slug } = useLocalSearchParams();
  const { data } = usePosts(+(slug || 0) || null);

  const post = data as Post;

  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const goToPostComments = () => {
    router.replace(`/comments/${slug}`);
  };

  const { mutateAsync } = useCommentCreateMutation();
  const doComment = async () => {
    if (comment === "" || Object.keys(comment).length === 0) {
      setError("Preencha todos os dados");
      return;
    }

    if (!post?.id) {
      return;
    }
    await mutateAsync({ comment, userId, postId: post?.id });
    goToPostComments();
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={goToPostComments} />
        <Appbar.Content title={`Novo comentário em ${post?.title ?? ""}`} />
      </Appbar.Header>
      <View style={styles.container}>
        <ErrorMessage error={error} />
        <TextInput
          label="Comentário"
          multiline
          numberOfLines={10}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <Button icon="comment" mode="contained" onPress={doComment}>
          Comentar
        </Button>
        <Button mode="text">Cancelar</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
});

export default New;
