import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import usePosts from "@/dataHooks/usePosts";
import { Link, router, useLocalSearchParams } from "expo-router";
import { PostDTO } from "../feed";
import { Appbar, Button, Text } from "react-native-paper";

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

  const goToPosts = () => {
    router.replace("/feed");
  };

  const goToComments = () => {
    router.replace(`/comments/${castData?.id}`);
  };

  return (
    <SafeAreaView style={styles.containerScrollArea}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goToPosts} />
        <Appbar.Content title={`Post ${castData?.id ?? ""}`} />
      </Appbar.Header>
      <ScrollView>
        <Image
          style={styles.postImage}
          source={{
            uri: castData?.imgLink.includes("http")
              ? castData?.imgLink
              : "https://picsum.photos/700",
          }}
        />
        <View style={styles.containerPostText}>
          <Text variant="titleLarge">Título do Post {castData.id}</Text>
          <Text variant="bodyMedium">
            {castData.text}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            delectus eum numquam a nihil, odio cupiditate perferendis optio
            repudiandae? Aliquid ad rem cumque molestias dolor veritatis veniam
            optio pariatur tempora? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Suscipit reprehenderit obcaecati voluptatem quam
            nihil ea in necessitatibus excepturi, quo eligendi accusamus facilis
            quasi esse laudantium quisquam ducimus ullam fugit assumenda? Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Quo, eum debitis
            excepturi omnis placeat perspiciatis tempore molestias saepe eveniet
            quos molestiae dolores aspernatur sunt voluptates voluptas, quasi
            similique quibusdam illum! Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Ipsam soluta provident vero itaque odio sed
            voluptatum quaerat quasi. Ex ea corrupti laudantium maiores
            consectetur consequuntur iusto, voluptatum illum nesciunt a!
          </Text>
          <Button onPress={goToComments}>Ver comentários</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default Post;
