import { useInfiniteQuery } from "@tanstack/react-query";
import { getInfinitePosts } from "@/api/post/post.get";

export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      getInfinitePosts({ pageParam }),
    getNextPageParam: (lastPage: { nextCursor?: string }) =>
      lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
  });
}
