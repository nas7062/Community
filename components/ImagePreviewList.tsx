import { ImageUri } from "@/types";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";

interface ImagePreviewListProps {
  imageUrls: ImageUri[];
}

function ImagePreviewList({ imageUrls = [] }: ImagePreviewListProps) {
  return (
    <ScrollView
      nestedScrollEnabled={true}
      horizontal
      showsHorizontalScrollIndicator
      contentContainerStyle={styles.container}
    >
      {imageUrls.map(({ url }, index) => {
        const encodedUrl = encodeURIComponent(url);
        return (
          <Pressable
            style={styles.imgContainer}
            key={url + index}
            onPress={() =>
              router.push({ pathname: "/image", params: { url: encodedUrl } })
            }
          >
            <Image style={styles.image} source={{ uri: url }} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    flexDirection: "row",
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
