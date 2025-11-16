import RefreshButton from '@/components/commits/RefreshButton'

export const Header = () => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Commit History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Viewing commits from{' '}
            <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              history-github-app
            </code>
          </p>
        </div>
        <RefreshButton />
      </div>
    </header>
  )
}

