import { getInfiniteLikePosts } from "@/api/post/post.get";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetLikePosts(userId: string) {
  return useInfiniteQuery({
    queryKey: ["likeposts", userId],
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      getInfiniteLikePosts({ pageParam, userId }),
    getNextPageParam: (lastPage: { nextCursor?: string }) =>
      lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
    enabled: !!userId,
  });
}
