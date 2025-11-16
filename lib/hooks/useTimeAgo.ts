import { useEffect, useState } from "react";
import { formatTimeAgo } from "@/lib/utils/formatters";

/**
 * Hook that returns a human-readable "time ago" string that auto-updates every minute
 * @param date - The date to format (ISO string or Date object)
 * @param updateInterval - Update interval in milliseconds (default: 60000 = 1 minute)
 * @returns Formatted time ago string (e.g., "2 minutes ago")
 */
export function useTimeAgo(
  date: string | Date,
  updateInterval: number = 60000
): string {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTimeAgo(formatTimeAgo(date));
    };

    // Initial update
    updateTime();

    // Set up interval for periodic updates
    const interval = setInterval(updateTime, updateInterval);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [date, updateInterval]);

  return timeAgo;
}
