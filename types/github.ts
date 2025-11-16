/**
 * Formatted commit data for display in UI
 */
export interface CommitDisplayData {
  sha: string;
  message: string;
  authorName: string;
  authorLogin: string | null;
  authorAvatar: string | null;
  date: string;
  url: string;
}
