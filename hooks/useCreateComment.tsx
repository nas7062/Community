import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateComment } from "@/api/comment/comment.write";
import Toast from "react-native-toast-message";

export function useCreateComment(docId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", docId],
      });
      queryClient.invalidateQueries({ queryKey: ["posts", "count"] });
      Toast.show({
        type: "success",
        text1: "댓글 작성 완료",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "댓글 작성 실패",
      });
    },
  });
}
