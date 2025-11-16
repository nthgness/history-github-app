# Architecture for Scaling to 1,000+ Repositories

## Overview

This document outlines the architectural decisions and strategies for scaling the Git Commit History Viewer from a single repository to a B2B interface handling 1,000+ repositories.

---

## 1. Frontend Architecture (Component Design & Data Flow)

### Current Architecture
- Single repository view
- Direct component-to-hook data flow
- React Query for client-side caching
- Server Actions for mutations

### Scaled Architecture

#### Component Structure
```
components/
├── repository/
│   ├── RepositorySelector.tsx       # Multi-repo dropdown/search
│   ├── RepositoryList.tsx           # List of monitored repos
│   └── RepositoryCard.tsx           # Summary card for each repo
├── commits/
│   ├── CommitsContainer.tsx         # Reusable (accepts repoId)
│   ├── CommitList.tsx               # Virtual scrolling for performance
│   ├── CommitItem.tsx
│   └── CommitFilters.tsx            # Filter by author, date, branch
├── analytics/
│   ├── CommitActivityChart.tsx      # Visualization across repos
│   └── ContributorStats.tsx         # Team metrics
└── shared/
    ├── VirtualList.tsx               # Virtualization for large lists
    └── InfiniteScroll.tsx            # Pagination component
```

#### Data Flow Strategy

**State Management Layers:**

1. **URL State** (for sharable views)
   - Selected repository ID
   - Active filters
   - Pagination parameters

2. **React Query Cache** (server state)
   - Repository metadata
   - Commit data per repository
   - Aggregated statistics
   - 5-minute stale time with background refetch

3. **Local State** (UI state)
   - Expanded/collapsed items
   - Selected commits
   - Active modals

4. **Global State** (Zustand/Context)
   - User preferences
   - Theme settings
   - Recently viewed repositories

**Data Flow Pattern:**
```
User Action → URL Update → React Query Fetch → Server Action → API Route → Service Layer → GitHub API
```

---

## 2. Caching Strategy (Rate Limits & Performance)

### Problem at Scale
- GitHub API: 5,000 requests/hour (authenticated)
- 1,000 repos × 50 commits = potentially 50,000 data points
- Need to avoid hitting rate limits while maintaining real-time feel

### Multi-Layer Caching Strategy

#### Layer 1: Client-Side (React Query)
```typescript
// Aggressive caching for commit data
{
  staleTime: 5 * 60 * 1000,        // 5 minutes
  cacheTime: 30 * 60 * 1000,       // 30 minutes
  refetchOnWindowFocus: false,      // Prevent unnecessary refetches
  refetchOnMount: false,            // Use cached data first
}
```

#### Layer 2: Edge Caching (Vercel/CDN)
```typescript
// API Routes with ISR (Incremental Static Regeneration)
export const revalidate = 300; // 5 minutes

// Or dynamic with cache headers
return new Response(data, {
  headers: {
    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
  }
});
```

#### Layer 3: Server-Side Database (Redis/PostgreSQL)
```typescript
// Cache GitHub API responses
interface CachedCommit {
  repoId: string;
  sha: string;
  data: CommitData;
  fetchedAt: Date;
  expiresAt: Date;
}

// Strategy:
// 1. Check cache first
// 2. If expired, fetch from GitHub API
// 3. Store with TTL (15-60 minutes depending on repo activity)
```

#### Layer 4: Background Jobs (Cron/Queue)
```typescript
// Proactively update active repositories
// Run every 5-15 minutes for frequently accessed repos
// Run hourly for less active repos

// Use job queue (BullMQ/Inngest) to:
// 1. Fetch new commits for all monitored repos
// 2. Update cache asynchronously
// 3. Respect GitHub rate limits with queue throttling
```

### Rate Limit Management

```typescript
// Rate limiter middleware
class GitHubRateLimiter {
  async checkAndWait() {
    const remaining = await redis.get('github:ratelimit:remaining');
    const resetTime = await redis.get('github:ratelimit:reset');
    
    if (remaining < 100) {
      // Pause requests until reset
      await this.waitUntilReset(resetTime);
    }
  }
  
  async updateFromHeaders(headers: Headers) {
    await redis.set('github:ratelimit:remaining', headers.get('x-ratelimit-remaining'));
    await redis.set('github:ratelimit:reset', headers.get('x-ratelimit-reset'));
  }
}
```

### Smart Polling Strategy

```typescript
// Different polling intervals based on repository activity
interface PollingStrategy {
  highActivity: 5 * 60 * 1000,    // 5 min - repos with commits in last hour
  mediumActivity: 15 * 60 * 1000, // 15 min - commits in last day
  lowActivity: 60 * 60 * 1000,    // 60 min - less active repos
}
```

---

## 3. Server vs. Client Logic Distribution

### Server-Side Responsibilities

**✅ Must be server-side:**
- GitHub API authentication (token security)
- Data fetching from GitHub API
- Rate limit management
- Data aggregation and processing
- Database operations
- Cache invalidation logic
- Webhook handling (for real-time updates)

```typescript
// app/api/repos/[id]/commits/route.ts
export async function GET(req: Request, { params }: { params: { id: string } }) {
  // 1. Authenticate
  // 2. Check rate limits
  // 3. Check cache
  // 4. Fetch from GitHub if needed
  // 5. Transform data
  // 6. Return with cache headers
}
```

### Client-Side Responsibilities

**✅ Can be client-side:**
- UI state management
- Timestamp formatting and auto-refresh
- Filtering and sorting (if data already fetched)
- Pagination controls
- Virtualization of long lists
- Optimistic updates
- User preferences

```typescript
// Client-side filtering (after data is fetched)
const filteredCommits = useMemo(() => 
  commits.filter(c => 
    c.author.includes(searchQuery) &&
    isAfter(c.date, dateFilter)
  ), [commits, searchQuery, dateFilter]
);
```

### Hybrid Approaches

**Server Components (Next.js):**
```typescript
// Initial data fetching in Server Component
async function RepositoryPage({ repoId }: { repoId: string }) {
  const initialCommits = await getCommitsFromCache(repoId);
  
  return (
    <CommitsContainer 
      initialData={initialCommits} 
      repoId={repoId} 
    />
  );
}
```

**Client Components with React Query:**
```typescript
// Client component with real-time updates
function CommitsContainer({ initialData, repoId }) {
  const { data } = useCommitsQuery(repoId, { initialData });
  // Auto-refreshing on client
}
```

---

## 4. Scalability & Observability

### Monitoring Strategy

#### Application Metrics (Vercel Analytics / Datadog)
```typescript
// Custom metrics
metrics.increment('github.api.requests', {
  repo: repoId,
  status: response.status
});

metrics.gauge('cache.hit_rate', hitRate);
metrics.histogram('api.response_time', duration);
```

#### Logging (Structured Logs)
```typescript
// Use structured logging (Pino/Winston)
logger.info({
  action: 'fetch_commits',
  repoId,
  commitCount: commits.length,
  duration: Date.now() - startTime,
  cacheHit: fromCache,
  rateLimitRemaining: headers.get('x-ratelimit-remaining')
});
```

#### Error Tracking (Sentry)
```typescript
// Contextualized error tracking
Sentry.captureException(error, {
  tags: {
    feature: 'commit_fetching',
    repoId: repoId
  },
  extra: {
    rateLimitRemaining,
    cacheStatus
  }
});
```

#### Real-time Dashboards

**Key Metrics to Track:**
- API response times (p50, p95, p99)
- GitHub API rate limit usage
- Cache hit/miss ratios
- Error rates per repository
- Active users per repository
- Background job queue length
- Database query performance

### Error Handling

#### Graceful Degradation
```typescript
// Fallback strategies
async function fetchCommits(repoId: string) {
  try {
    // Try primary API
    return await githubApi.getCommits(repoId);
  } catch (error) {
    if (error.status === 403) {
      // Rate limit hit - return cached data
      return await getCachedCommits(repoId);
    }
    
    if (error.status === 404) {
      // Repo not found - mark as inactive
      await markRepoInactive(repoId);
      throw new NotFoundError();
    }
    
    // Generic error - return last known good data
    return await getLastKnownGoodData(repoId);
  }
}
```

#### Circuit Breaker Pattern
```typescript
// Prevent cascading failures
class CircuitBreaker {
  async execute(fn: Function) {
    if (this.isOpen()) {
      throw new Error('Circuit breaker open');
    }
    
    try {
      const result = await fn();
      this.recordSuccess();
      return result;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }
}
```

### Scalability Patterns

#### Horizontal Scaling
- Stateless API routes (can scale to multiple instances)
- Database connection pooling
- Distributed caching (Redis Cluster)
- Job queue with multiple workers

#### Database Optimization
```sql
-- Indexes for common queries
CREATE INDEX idx_commits_repo_date ON commits(repo_id, created_at DESC);
CREATE INDEX idx_commits_author ON commits(author_login);

-- Partitioning for large datasets
CREATE TABLE commits_2024_01 PARTITION OF commits
  FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

#### Data Retention Policy
- Keep full data for 90 days
- Aggregate older data (daily/weekly summaries)
- Archive old commits to cold storage (S3)

---

## Summary

**Key Architectural Decisions:**

1. **Multi-layer caching** to minimize GitHub API calls
2. **Background jobs** for proactive data fetching
3. **React Query + Server Components** for optimal data flow
4. **Redis + PostgreSQL** for persistence and caching
5. **Structured logging + Sentry** for observability
6. **Circuit breakers + graceful degradation** for resilience
7. **Virtual scrolling + pagination** for performance at scale

This architecture supports:
- ✅ 1,000+ repositories
- ✅ Real-time updates without rate limit issues
- ✅ Sub-second response times (via caching)
- ✅ Comprehensive error handling and monitoring
- ✅ Horizontal scalability as user base grows

