import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/api/comment/comment.get";

export function useGetComment(docId: string) {
  return useQuery({
    queryKey: ["comments", docId],
    queryFn: () => {
      if (!docId) throw new Error("useGetPostById Error");
      return getComments(docId);
    },
    enabled: !!docId,
  });
}
