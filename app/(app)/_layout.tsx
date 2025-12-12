import { Stack } from "expo-router";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { getLocales } from "expo-localization";
export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const devicelanguage = getLocales()[0].languageCode ?? "ko";
console.log("Current device language: ", devicelanguage);
const resources = {
  en: {
    translation: {
      Home: "Home",
      Profile: "Profile",
      Setting: "Setting",
      Cancle: "Cancle",
      languageSetting: "language Setting",
      AppSetting: "App Setting",
    },
  },
  ko: {
    translation: {
      Home: "홈",
      Profile: "내 프로필",
      Setting: "설정",
      Cancle: "취소",
      languageSetting: "언어 설정",
      AppSetting: "앱 설정",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: devicelanguage,
    fallbackLng: "ko",
    debug: true,
  })
  .then(() => {
    console.log("i18n initialized successfully");
  })
  .catch((err) => {
    console.error("i18n initialization error: ", err);
  });

export default function AppStackLayout() {
  const { t } = useTranslation();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 탭 그룹 */}
      <Stack.Screen name="(tabs)" />

      {/* 탭에서 push 되어 가는 화면들 */}
      <Stack.Screen name="post" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="image" />
    </Stack>
  );
}
