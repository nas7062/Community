import * as Localization from "expo-localization";

export function getDeviceLanguage() {
  return Localization.getLocales()[0]?.languageCode ?? "ko";
}
