import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/auth";

export function useGetProfile(userId: string) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => {
      if (!userId) throw new Error("useGetPostById Error");
      return getProfile(userId);
    },
    enabled: !!userId,
  });
}
