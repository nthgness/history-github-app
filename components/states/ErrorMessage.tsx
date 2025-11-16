import { AlertIcon } from '@/components/icons/AlertIcon'

interface ErrorMessageProps {
  title?: string
  message: string
}

export const ErrorMessage = ({ 
  title = 'Failed to load commits',
  message 
}: ErrorMessageProps) => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
        <AlertIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto">
        {message}
      </p>
    </div>
  )
}

