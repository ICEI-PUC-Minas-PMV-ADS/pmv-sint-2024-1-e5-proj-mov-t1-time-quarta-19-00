import { View, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Button, TextInput } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { Post } from "@/services";
import usePosts, {
  usePostCreateMutation,
  usePostUpdateMutation,
} from "@/dataHooks/usePosts";
import ErrorMessage from "@/components/ErrorMessage";
import useAuth from "@/hooks/useAuth";

type Props = {};

const NewPost = (props: Props) => {
  const searchInfo = useLocalSearchParams();
  const editPostId = searchInfo?.editPost;
  const isInEditMode = Boolean(editPostId);

  const { data: postInitialData = {} } = usePosts(Number(editPostId));

  const [postData, setPostData] = useState(postInitialData as Post);
  const [error, setError] = useState("");
  const { userId } = useAuth();

  useEffect(() => {
    if (postInitialData) {
      setPostData(postInitialData as Post);
    }
  }, [postInitialData]);

  const updatePostData = (key: keyof Post, value: string) => {
    setPostData({ ...postData, [key]: value });
  };
  const goToFeed = () => {
    router.replace("/feed");
  };

  const { mutateAsync } = usePostCreateMutation();
  const { mutateAsync: updateMutateAsync } = usePostUpdateMutation();

  const doRegisterPost = async () => {
    try {
      if (
        postData?.title === "" ||
        postData?.imgLink === "" ||
        postData?.text === "" ||
        Object.keys(postData).length === 0
      ) {
        setError("Preencha todos os dados");
        return;
      }

      if (isInEditMode) {
        await updateMutateAsync({
          ...postData,
          userId,
          id: Number(editPostId),
        });
        goToFeed();
        return;
      }

      await mutateAsync({ ...postData, userId });
      goToFeed();
    } catch (er) {
      setError("Erro ao cadastrar post");
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goToFeed} />
        <Appbar.Content title={isInEditMode ? "Editar post" : "Novo post"} />
      </Appbar.Header>
      <View style={styles.containerForm}>
        <Image
          source={{
            uri: "https://i.ytimg.com/vi/ZkD59RKLLls/maxresdefault.jpg",
          }}
          style={{
            width: 200,
            height: 200,
            margin: "auto",
            marginVertical: 16,
          }}
        />
        <ErrorMessage error={error} />
        <TextInput
          label="Título do Post"
          value={postData.title}
          onChangeText={(text) => updatePostData("title", text)}
        />
        <TextInput
          label="Endereço da imagem de capa"
          value={postData.imgLink}
          onChangeText={(text) => updatePostData("imgLink", text)}
        />
        <TextInput
          label="Texto do Post"
          multiline
          value={postData.text}
          onChangeText={(text) => updatePostData("text", text)}
        />
        <Button
          icon={isInEditMode ? "check" : "plus"}
          mode="contained"
          onPress={doRegisterPost}
        >
          {isInEditMode ? "Salvar Post" : "Cadastrar Post"}
        </Button>
        <Button mode="text" onPress={goToFeed}>
          Cancelar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerForm: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
});

export default NewPost;
