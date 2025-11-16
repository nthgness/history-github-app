'use client'

import { useFormStatus } from 'react-dom'
import { refreshCommits } from '@/app/actions'
import { RefreshIcon } from '@/components/icons/RefreshIcon'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/lib/constants'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md disabled:cursor-not-allowed"
    >
      <RefreshIcon className={`w-5 h-5 ${pending ? 'animate-spin' : ''}`} />
      {pending ? 'Refreshing...' : 'Refresh'}
    </button>
  )
}

const RefreshButton = () => {
  const queryClient = useQueryClient()

  async function handleRefresh(formData: FormData) {
    const result = await refreshCommits()
    
    if (result.success) {
      // Update React Query cache for smooth UI update
      queryClient.setQueryData(QUERY_KEYS.commits, result.data)
    }
  }

  return (
    <form action={handleRefresh}>
      <SubmitButton />
    </form>
  )
}

export default RefreshButton;