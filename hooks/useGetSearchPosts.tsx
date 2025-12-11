import { getInfiniteSearchPosts } from "@/api/post/post.get";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetSearchPosts(q?: string) {
  return useInfiniteQuery({
    queryKey: ["searchposts", queueMicrotask],
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      getInfiniteSearchPosts({ pageParam, q }),
    getNextPageParam: (lastPage: { nextCursor?: string }) =>
      lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
  });
}
