// Feed.js
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

type PostsProps = {
  id: number;
  userId: string;
  text: string;
  institutionId: string;
  timeStamp: string;
  imgLink: string;
};

export const posts = [
  {
    id: "1",
    userName: "nome do usuário",
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
  const [postsItem, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://find-ong-api.onrender.com/posts/",
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  console.log(postsItem);
  const renderItem = ({ item }: any) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
        <Text style={styles.userName}>{item.userName}</Text>
      </View>
      <View style={styles.boxImage}>
        <Image source={{ uri: item.postImage }} style={styles.postImage} />
        <Text style={styles.postDescription}>{item?.caption}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.comments}>View all {item.comments} comments</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      // @ts-ignore
      keyExtractor={(item) => item?.id || ""}
      style={styles.feed}
    />
  );
};

const styles = StyleSheet.create({
  feed: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postDescription: {
    color: "black",
    marginLeft: 15,
    marginTop: 15,
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
  boxImage: {
    margin: 10,
    borderRadius: 30,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 2,
    backgroundColor: "#dddddd",
  },
  postImage: {
    width: "100%",
    height: 300,
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
