// Feed.js
import usePosts from "@/dataHooks/usePosts";
import { Link } from "expo-router";
import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

export type PostDTO = {
  id: string;
  text: string;
  imgLink: string;
};

const Feed = () => {
  const { data } = usePosts();
  console.log(data);
  const renderItem = ({ item }: { item: PostDTO }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={{ uri: item.imgLink }} style={styles.avatar} />
        <Text style={styles.userName}>{"item.userName"}</Text>
      </View>
      {Boolean(item.imgLink.includes("http")) && (
        <Image source={{ uri: item.imgLink }} style={styles.postImage} />
      )}
      <View style={styles.footer}>
        <Text style={styles.caption}>{item.text.slice(0, 20) + "..."}</Text>
        <Link href={`/post/${item.id}`}>Ler post completo</Link>
        <Link href={`/comments/${item.id}`} style={styles.comments}>
          Ver todos comentários
        </Link>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data as PostDTO[]}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.feed}
    />
  );
};

const styles = StyleSheet.create({
  feed: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postContainer: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: 400,
  },
  footer: {
    padding: 10,
  },
  likes: {
    fontWeight: "bold",
  },
  caption: {
    marginTop: 5,
  },
  comments: {
    marginTop: 5,
    color: "gray",
  },
});

export default Feed;
