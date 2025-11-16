import { useMutation, useQueryClient } from "@tanstack/react-query";
import { refreshCommits } from "@/app/actions";
import { QUERY_KEYS } from "@/lib/constants";

export function useRefreshCommitsQuery() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const result = await refreshCommits();
      if (!result.success) {
        throw new Error(result.error || "Failed to refresh commits");
      }
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.commits, data);
    },
  });

  return {
    refresh: mutation.mutate,
    isRefreshing: mutation.isPending,
    error: mutation.error,
  };
}
