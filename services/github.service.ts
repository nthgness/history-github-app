import { Octokit } from "octokit";
import { GITHUB_DEFAULTS } from "@/lib/constants";
import type {
  CommitDisplayData,
  RepositoryInfo,
  FetchCommitsOptions,
} from "@/types";

/**
 * Repository configuration from environment variables
 */
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "nthgness";
const GITHUB_REPO = process.env.GITHUB_REPO || "history-github-app";

/**
 * Type for commit from Octokit API
 */
type OctokitCommit = Awaited<
  ReturnType<typeof octokit.rest.repos.listCommits>
>["data"][number];

/**
 * Initialize Octokit client with authentication
 */
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

/**
 * Transform GitHub API commit to our display format
 * @param commit - Raw commit data from GitHub API
 * @returns Formatted commit data for display
 */
function transformCommit(commit: OctokitCommit): CommitDisplayData {
  return {
    sha: commit.sha,
    message: commit.commit.message,
    authorName: commit.commit.author?.name || "Unknown",
    authorLogin: commit.author?.login || null,
    authorAvatar: commit.author?.avatar_url || null,
    date: commit.commit.author?.date || new Date().toISOString(),
    url: commit.html_url,
  };
}

/**
 * GitHub API error with status code
 */
interface GitHubApiError {
  status?: number;
  message?: string;
}

/**
 * Handle GitHub API errors with specific messages
 * @param error - Error from GitHub API
 * @param branch - Branch name for context
 * @throws Error with descriptive message
 */
function handleGitHubError(error: unknown, branch: string): never {
  const apiError = error as GitHubApiError;

  if (apiError.status === 404) {
    throw new Error(
      `Repository ${GITHUB_OWNER}/${GITHUB_REPO} not found or branch '${branch}' does not exist`
    );
  }

  if (apiError.status === 403) {
    throw new Error("GitHub API rate limit exceeded. Please try again later.");
  }

  if (apiError.status === 401) {
    throw new Error(
      "GitHub authentication failed. Please check your GITHUB_TOKEN."
    );
  }

  // Generic error
  throw new Error(
    `Failed to fetch commits: ${apiError.message || "Unknown error"}`
  );
}

/**
 * Fetch commits from GitHub repository
 * @param options - Optional configuration for branch and pagination
 * @returns Array of formatted commit data
 * @throws Error if GitHub API request fails
 *
 * @example
 * ```ts
 * const commits = await fetchCommits({ branch: 'main', perPage: 10 })
 * ```
 */
export async function fetchCommits(
  options: FetchCommitsOptions = {}
): Promise<CommitDisplayData[]> {
  const { branch = GITHUB_DEFAULTS.branch, perPage = GITHUB_DEFAULTS.perPage } =
    options;

  try {
    // Validate environment variables
    if (!GITHUB_TOKEN) {
      throw new Error(
        "GITHUB_TOKEN is not configured in environment variables"
      );
    }

    const response = await octokit.rest.repos.listCommits({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      sha: branch,
      per_page: perPage,
    });

    return response.data.map(transformCommit);
  } catch (error) {
    handleGitHubError(error, branch);
  }
}

/**
 * Get repository information from GitHub
 * @returns Repository info or null if request fails
 *
 * @example
 * ```ts
 * const info = await getRepositoryInfo()
 * if (info) {
 *   console.log(info.name, info.defaultBranch)
 * }
 * ```
 */
export async function getRepositoryInfo(): Promise<RepositoryInfo | null> {
  try {
    const response = await octokit.rest.repos.get({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
    });

    return {
      name: response.data.name,
      fullName: response.data.full_name,
      description: response.data.description,
      defaultBranch: response.data.default_branch,
      url: response.data.html_url,
    };
  } catch (error) {
    const err = error as { message?: string };
    console.error(
      "Failed to fetch repository info:",
      err.message || "Unknown error"
    );
    return null;
  }
}
