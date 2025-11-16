import { formatDistanceToNow } from "date-fns";

/**
 * Format a date to a human-readable "time ago" string
 * @example "2 minutes ago", "3 hours ago"
 */
export const formatTimeAgo = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
};

/**
 * Format a git SHA to short version (7 characters)
 * @example "a1b2c3d4e5f" -> "a1b2c3d"
 */
export const formatSha = (sha: string): string => {
  return sha.substring(0, 7);
};

/**
 * Format a number with commas for readability
 * @example 1000 -> "1,000"
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Truncate text with ellipsis
 * @example "Long text here" -> "Long te..."
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
