import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveStorage(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.warn("saveStorage error:", e);
  }
}

export async function getStorage(key: string) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.warn("getStorage error:", e);
    return null;
  }
}

export async function deleteStorage(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn("deleteStorage error:", e);
  }
}
