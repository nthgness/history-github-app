'use client'

import { SearchIcon } from '@/components/icons/SearchIcon'

interface CommitFiltersProps {
  search: string
  selectedAuthor: string
  authors: string[]
  totalCount: number
  filteredCount: number
  hasFilters: boolean
  onSearchChange: (search: string) => void
  onAuthorChange: (author: string) => void
  onClear: () => void
}

const CommitFilters = ({ 
  search,
  selectedAuthor,
  authors,
  totalCount,
  filteredCount,
  hasFilters,
  onSearchChange,
  onAuthorChange,
  onClear
}: CommitFiltersProps) => {

  return (
    <div className="mb-6 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search commits by message or author..."
          className="w-full px-4 py-3 pl-11 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
        />
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Author Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Author:
          </label>
          <select
            value={selectedAuthor}
            onChange={(e) => onAuthorChange(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
          >
            <option value="all">All authors</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={onClear}
            className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Clear filters
          </button>
        )}

        {/* Results Count */}
        <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
          {filteredCount === totalCount ? (
            <span>{totalCount} commits</span>
          ) : (
            <span>
              {filteredCount} of {totalCount} commits
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommitFilters

