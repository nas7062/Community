import React, { useRef, useState } from "react";
import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Feed from "./Feed";
import { colors } from "@/constants";
import { useScrollToTop } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchInput from "./SearchInput";
import { router } from "expo-router";
import { useGetSearchPosts } from "@/hooks/useGetSearchPosts";
import { useDebounce } from "@/hooks/useDebounce";

function SearchFeedList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetSearchPosts(debouncedSearch);
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  const [isRefreshing, setIsRefreshing] = useState(false);
  const topRef = useRef<FlatList | null>(null);

  useScrollToTop(topRef);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.back}>
          <Ionicons
            name="arrow-back"
            size={25}
            color={colors.BLACK}
            onPress={() => router.back()}
          />
        </View>
        <SearchInput
          onChangeText={(value) => setSearch(value)}
          value={search}
          autoFocus
        />
      </View>
      <FlatList
        ref={topRef}
        data={posts}
        renderItem={({ item }) => <Feed post={item} />}
        keyExtractor={(item) => item.docId ?? String(item.id)}
        contentContainerStyle={styles.contentContainer}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
  inputContainer: {
    marginBottom: 10,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  back: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchFeedList;
