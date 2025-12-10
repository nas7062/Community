import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/post/post.get";

export function useGetPosts() {
  const { data } = useQuery({
    queryKey: ["posts", "count"],
    queryFn: getPosts,
  });

  return data ? data : [];
}
