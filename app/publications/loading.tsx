import { Skeleton, SkeletonPublicationCard } from '@/components/ui'

export default function PublicationsLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-6 w-80" />
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-4 w-10" />
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-6 w-24" />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-4 w-10" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-6 w-14" />
          ))}
        </div>
      </div>

      {/* Results count */}
      <Skeleton className="h-4 w-40 mb-6" />

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonPublicationCard key={i} />
        ))}
      </div>
    </div>
  )
}
