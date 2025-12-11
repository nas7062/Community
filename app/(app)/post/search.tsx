import SearchFeedList from "@/components/SearchFeedList";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface searchProps {}

function SearchScreen({}: searchProps) {
  return (
    <SafeAreaView style={styles.container}>
      <SearchFeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SearchScreen;
