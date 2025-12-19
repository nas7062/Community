import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import i18n, { initI18n } from "@/util/i18n";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function AppStackLayout() {
  const [loaded] = useFonts({
    NoonnuBasic: require("@/assets/font/NoonnuBasicGothicRegular.ttf"),
  });

  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    const boot = async () => {
      // 항상 한국어를 기본 언어로 사용
      await initI18n("ko");
      setI18nReady(true);
    };

    boot();
  }, []);

  useEffect(() => {
    if (loaded && i18nReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, i18nReady]);

  if (!loaded || !i18nReady) {
    return null;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 탭 그룹 */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />

      {/* 탭에서 push 되어 가는 화면들 */}
      <Stack.Screen
        name="post"
        options={{
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
      <Stack.Screen
        name="auth"
        options={{
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
      <Stack.Screen
        name="image"
        options={{
          headerTitleStyle: { fontFamily: "NoonnuBasic" },
        }}
      />
    </Stack>
  );
}
