import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePost } from "@/api/post/post.write";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export function useCreatePost() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: CreatePost,
    onSuccess: () => {
      router.replace("/");
      queryclient.invalidateQueries({ queryKey: ["posts"] });
      Toast.show({
        type: "success",
        text1: "글 작성 완료",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "글 작성 실패",
      });
    },
  });
}
