import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "@/api/comment/comment.write";
import Toast from "react-native-toast-message";
export function useDeleteComment(postDocId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentDocId,
      commentId,
    }: {
      commentDocId: string;
      commentId: number;
    }) =>
      deleteComment({
        postDocId,
        commentDocId,
        commentId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postDocId] });
      queryClient.invalidateQueries({ queryKey: ["posts", "count"] });
      Toast.show({
        type: "success",
        text1: "댓글 삭제 완료",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "댓글 삭제 실패",
      });
    },
  });
}
