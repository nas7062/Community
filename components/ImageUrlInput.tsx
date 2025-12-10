import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Control, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/constants";
import { ProfileFormData } from "@/app/(tabs)/my/update";
import Toast from "react-native-toast-message";

type Props = {
  control: Control<ProfileFormData>;
};

export default function ImageInput({ control }: Props) {
  const [loading, setLoading] = useState(false);

  const pickImage = async (onChange: (value: string) => void) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "앨범 접근 권한을 허용해주세요.",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    const uri = result.assets[0]?.uri;
    if (!uri) return;

    try {
      setLoading(true);
      onChange(uri);

      Toast.show({
        type: "success",
        text1: "이미지 업로드가 완료되었습니다.",
      });
    } catch (e) {
      console.error(e);
      Toast.show({
        type: "error",
        text1: "이미지 업로드에 실패했습니다.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Controller
      control={control}
      name="imageUrl"
      render={({ field: { value, onChange } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>프로필 이미지</Text>
          <View style={styles.row}>
            <Pressable
              style={styles.avatarContainer}
              onPress={() => pickImage(onChange)}
            >
              {value ? (
                <Image source={{ uri: value }} style={styles.avatar} />
              ) : (
                <View style={styles.placeholder}>
                  <Ionicons name="person" size={32} color={colors.GRAY_500} />
                </View>
              )}
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={() => pickImage(onChange)}
            >
              <Ionicons name="camera" size={18} color={colors.BLACK} />
              <Text style={styles.buttonText}>이미지 선택</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: colors.GRAY_700,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: colors.GRAY_200,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.GRAY_100,
  },
  buttonText: {
    fontSize: 13,
    color: colors.BLACK,
  },
});
