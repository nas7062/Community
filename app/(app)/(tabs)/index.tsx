import FeedList from "@/components/FeedList";
import SearchInput from "@/components/SearchInput";
import { colors } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const { user, profile, loading, justSignedIn, setJustSignedIn } = useAuth();

  const prevUserRef = useRef<UserProfile | null>(null);

  useEffect(() => {
    if (loading) return;
    const prevUser = prevUserRef.current;
    if (!prevUser && user && profile?.displayName && justSignedIn) {
      Toast.show({
        type: "info",
        text1: `${profile.displayName}님 환영합니다`,
      });
      setJustSignedIn(false);
    }
    prevUserRef.current = null;
  }, [loading, user, profile?.displayName, justSignedIn, setJustSignedIn]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <SearchInput
          readOnly
          placeholder="글 제목 검색"
          onPress={() => router.push("/posts/search")}
        />
      </View>

      <FeedList />
      {user && (
        <Pressable
          style={styles.wirteBtn}
          onPress={() => router.push("/post/write")}
        >
          <Ionicons name="pencil" color={colors.WHITE} size={30} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  wirteBtn: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: colors.PRIMARY,
    width: 60,
    height: 60,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.BLACK,
    shadowOffset: { width: 1, height: 2 },
    elevation: 2,
  },
  inputContainer: {
    marginBottom: 10,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logo: {
    height: 44,
    width: 44,
    borderRadius: 50,
  },
});
