import { ImageUri } from "@/types";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, FlatList, StyleSheet } from "react-native";

interface ImagePreviewListProps {
  imageUrls: ImageUri[];
}

function ImagePreviewList({ imageUrls = [] }: ImagePreviewListProps) {
  return (
    <FlatList
      horizontal
      data={imageUrls}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.url}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        const encodedUrl = encodeURIComponent(item.url);
        return (
          <Pressable
            style={styles.imgContainer}
            onPress={() =>
              router.push({
                pathname: "/image",
                params: { url: encodedUrl },
              })
            }
          >
            <Image style={styles.image} source={{ uri: item.url }} />
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  imgContainer: {
    width: 100,
    height: 100,
    marginRight: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

export default ImagePreviewList;
