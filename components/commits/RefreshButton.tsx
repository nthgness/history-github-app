'use client'

import { useRefreshCommitsQuery } from '@/lib/hooks/useRefreshCommitsQuery'
import { RefreshIcon } from '@/components/icons/RefreshIcon'

const RefreshButton = () => {
  const { refresh, isRefreshing } = useRefreshCommitsQuery()

  return (
    <button
      onClick={() => refresh()}
      disabled={isRefreshing}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md disabled:cursor-not-allowed"
    >
      <RefreshIcon className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? 'Refreshing...' : 'Refresh'}
    </button>
  )
}

export default RefreshButton;