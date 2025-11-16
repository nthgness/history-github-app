import { useQuery } from "@tanstack/react-query";
import { getCommits } from "@/app/actions";
import { QUERY_KEYS, API_CONFIG } from "@/lib/constants";

export const useCommitsQuery = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.commits,
    staleTime: API_CONFIG.staleTime,
    refetchOnWindowFocus: API_CONFIG.refetchOnWindowFocus,
    retry: API_CONFIG.retryCount,
    queryFn: async () => {
      const result = await getCommits();
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch commits");
      }
      return result.data;
    },
  });

  return {
    commits: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
