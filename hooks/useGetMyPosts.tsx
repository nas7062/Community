import { getInfiniteMyPosts } from "@/api/post/post.get";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetMyPosts(userId: string) {
  return useInfiniteQuery({
    queryKey: ["myposts", userId],
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      getInfiniteMyPosts({ pageParam, userId }),
    getNextPageParam: (lastPage: { nextCursor?: string }) =>
      lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
    enabled: !!userId,
  });
}
