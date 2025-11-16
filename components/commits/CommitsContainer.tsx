'use client'

import { useCommitsQuery } from '@/lib/hooks/useCommitsQuery'
import CommitList from './CommitList'
import LoadingSkeleton from '@/components/states/LoadingSkeleton'
import { ErrorMessage } from '@/components/states/ErrorMessage'
import { ClipboardIcon } from '@/components/icons/ClipboardIcon'

const CommitsContainer = () => {
  const { commits, isLoading, isError, error } = useCommitsQuery()

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (isError) {
    return (
      <ErrorMessage 
        message={error instanceof Error ? error.message : 'Unknown error occurred'}
      />
    )
  }

  const uniqueAuthors = new Set(commits.map((c) => c.authorName)).size

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {commits.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Commits
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {uniqueAuthors}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Authors
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            main
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Branch
          </div>
        </div>
      </div>

      <main className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <ClipboardIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Recent Commits
        </h2>

        <CommitList commits={commits} />
      </main>
    </>
  )
}

export default CommitsContainer;