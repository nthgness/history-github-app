"use server";

import { revalidatePath } from "next/cache";
import { fetchCommits } from "@/services/github.service";
import { GITHUB_DEFAULTS } from "@/lib/constants";
import type { CommitDisplayData } from "@/types";

/**
 * Result type for commit operations
 */
interface CommitsResult {
  success: boolean;
  data: CommitDisplayData[];
  error: string | null;
}

/**
 * Server Action: Get commits from GitHub
 * @returns Result with commits data or error
 */
export async function getCommits(): Promise<CommitsResult> {
  try {
    const commits = await fetchCommits({
      branch: GITHUB_DEFAULTS.branch,
      perPage: GITHUB_DEFAULTS.perPage,
    });

    return { success: true, data: commits, error: null };
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching commits:", err.message);
    return { success: false, data: [], error: err.message };
  }
}

/**
 * Server Action: Refresh commits
 * Called by the refresh button to get fresh data
 * @returns Result with updated commits data or error
 */
export async function refreshCommits(): Promise<CommitsResult> {
  try {
    // Revalidate the home page to fetch fresh data
    revalidatePath("/");

    const commits = await fetchCommits({
      branch: GITHUB_DEFAULTS.branch,
      perPage: GITHUB_DEFAULTS.perPage,
    });

    return { success: true, data: commits, error: null };
  } catch (error) {
    const err = error as Error;
    console.error("Error refreshing commits:", err.message);
    return { success: false, data: [], error: err.message };
  }
}
