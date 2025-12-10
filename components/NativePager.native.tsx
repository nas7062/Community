import { MutableRefObject } from "react";
import { View } from "react-native";
import PagerView from "react-native-pager-view";
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
    <PagerView
      initialPage={0}
      ref={pagerRef}
      style={{ flex: 1 }}
      onPageSelected={(e: any) => {
        setCurrentTab(e.nativeEvent.position);
      }}
    >
      <View key="0" style={{ flex: 1 }}>
        <MyFeedList />
      </View>
      <View key="1" style={{ flex: 1 }}>
        <LikeFeedList />
      </View>
    </PagerView>
  );
}
