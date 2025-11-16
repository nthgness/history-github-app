"use client";

import { formatSha } from "@/lib/utils/formatters";
import { useTimeAgo } from "@/lib/hooks/useTimeAgo";
import type { CommitDisplayData } from "@/types";

interface CommitItemProps {
  commit: CommitDisplayData;
}

const CommitItem = ({ commit }: CommitItemProps) => {
  const timeAgo = useTimeAgo(commit.date);

  return (
    <div className="group relative border-l-2 border-gray-200 dark:border-gray-700 pl-6 pb-8 last:pb-0">
      {/* Timeline dot */}
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-900" />

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-start gap-3">
          {commit.authorAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={commit.authorAvatar}
              alt={commit.authorName}
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
              {commit.authorName.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <a
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-gray-100 font-medium line-clamp-2"
            >
              {commit.message}
            </a>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">{commit.authorName}</span>
              {commit.authorLogin && (
                <span className="text-gray-400 dark:text-gray-500">
                  @{commit.authorLogin}
                </span>
              )}
              <span className="text-gray-400 dark:text-gray-500">•</span>
              <time className="whitespace-nowrap" dateTime={commit.date}>
                {timeAgo}
              </time>
            </div>

            <div className="mt-2">
              <code className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded font-mono">
                {formatSha(commit.sha)}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommitItem;