// Feed.js
import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

type PostsProps = {
  id: string;
  userName: string;
  userAvatar: string;
  postImage: string;
  caption: string;
  likes: number;
  comments: number;
};

export const posts = [
  {
    id: "1",
    userName: "user1",
    userAvatar: "https://via.placeholder.com/150",
    postImage: "https://via.placeholder.com/500",
    caption: "This is a beautiful scenery!",
    likes: 123,
    comments: 12,
  },
  {
    id: "2",
    userName: "user2",
    userAvatar: "https://via.placeholder.com/150",
    postImage: "https://via.placeholder.com/500",
    caption: "Enjoying the sunshine!",
    likes: 456,
    comments: 34,
  },
  // Adicione mais posts conforme necessário
];

const Feed = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
        <Text style={styles.userName}>{item.userName}</Text>
      </View>
      <Image source={{ uri: item.postImage }} style={styles.postImage} />
      <View style={styles.footer}>
        <Text style={styles.likes}>{item.likes} likes</Text>
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.comments}>View all {item.comments} comments</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={posts}
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
