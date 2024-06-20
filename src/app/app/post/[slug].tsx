import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import usePosts from "@/dataHooks/usePosts";
import { Link, useLocalSearchParams } from "expo-router";
import { PostDTO } from "..";

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

  return (
    <View>
      {castData.imgLink.includes("http") ? (
        <Image style={styles.postImage} source={{ uri: castData.imgLink }} />
      ) : (
        "Sem imagem vinculada"
      )}
      <Text>Identificação do post: {castData?.id}</Text>
      <Text>Texto do post: {castData.text}</Text>
      <Link href={`/comments/${castData?.id}`}>Ver comentários</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  postImage: {
    width: "100%",
    height: 400,
  },
});

export default Post;
