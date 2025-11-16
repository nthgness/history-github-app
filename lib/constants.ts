/**
 * React Query keys for caching
 */
export const QUERY_KEYS = {
  commits: ["commits"] as const,
  repos: ["repos"] as const,
} as const;

/**
 * Cache time configurations (in milliseconds)
 */
export const CACHE_TIME = {
  commits: 60 * 1000, // 1 minute
  longTerm: 5 * 60 * 1000, // 5 minutes
  shortTerm: 30 * 1000, // 30 seconds
} as const;

/**
 * API configuration
 */
export const API_CONFIG = {
  retryCount: 1,
  staleTime: 60 * 1000, // 1 minute
  refetchOnWindowFocus: false,
} as const;

/**
 * GitHub API defaults
 */
export const GITHUB_DEFAULTS = {
  branch: "main",
  perPage: 30,
  maxCommits: 100,
} as const;
