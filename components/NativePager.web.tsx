import { MutableRefObject } from "react";
import { View } from "react-native";
import LikeFeedList from "./LikeFeedList";
import MyFeedList from "./MyFeedList";

export default function NativePager({
  pagerRef,
  setCurrentTab,
  currentTab,
}: {
  pagerRef: MutableRefObject<any>;
  setCurrentTab: (idx: number) => void;
  currentTab: number;
}) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      {currentTab === 0 ? <MyFeedList /> : <LikeFeedList />}
    </View>
  );
}
