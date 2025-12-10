import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/api/post/post.write";
import Toast from "react-native-toast-message";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (DocId: string) => deletePost(DocId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      Toast.show({
        type: "success",
        text1: "글 삭제 성공",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "글 삭제 실패",
      });
    },
  });
}
