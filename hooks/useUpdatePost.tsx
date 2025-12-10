import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "@/api/post/post.write";
import { CreatePostDto } from "@/types";
import Toast from "react-native-toast-message";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ docId, body }: { docId: string; body: CreatePostDto }) =>
      updatePost({ docId, body }),
    onSuccess: (docId) => {
      queryClient.invalidateQueries({ queryKey: ["post", docId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      Toast.show({
        type: "success",
        text1: "글 수정 성공",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "글 수정 실패",
      });
    },
  });
}
