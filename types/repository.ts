/**
 * Repository information from GitHub API
 */
export interface RepositoryInfo {
  name: string;
  fullName: string;
  description: string | null;
  defaultBranch: string;
  url: string;
}

/**
 * Options for fetching commits
 */
export interface FetchCommitsOptions {
  branch?: string;
  perPage?: number;
}
