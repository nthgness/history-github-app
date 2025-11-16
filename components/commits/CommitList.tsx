'use client'

import CommitItem from './CommitItem'
import type { CommitDisplayData } from '@/types'
import { EmptyState } from '@/components/states/EmptyState'

interface CommitListProps {
  commits: CommitDisplayData[]
}

const CommitList = ({ commits }: CommitListProps) => {
  if (commits.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-0">
      {commits.map((commit) => (
        <CommitItem key={commit.sha} commit={commit} />
      ))}
    </div>
  )
}

export default CommitList;