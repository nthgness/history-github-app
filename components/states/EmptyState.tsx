import { DocumentIcon } from '@/components/icons/DocumentIcon'

interface EmptyStateProps {
  title?: string
  description?: string
}

export const EmptyState = ({ 
  title = 'No commits found',
  description = 'Try refreshing the list or check your settings'
}: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <DocumentIcon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}

