import React from "react";
import { View, StyleSheet } from "react-native";
import LikeFeedList from "./LikeFeedList";
import MyFeedList from "./MyFeedList";

type NativePagerProps = {
  currentTab: number;
};

export default function NativePager({ currentTab }: NativePagerProps) {
  return (
    <View style={styles.container}>
      {currentTab === 0 ? <MyFeedList key="my" /> : <LikeFeedList key="like" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
