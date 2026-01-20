import { Skeleton, SkeletonPersonCard } from '@/components/ui'

export default function PeopleLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-10 w-36 mb-2" />
        <Skeleton className="h-6 w-72" />
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <Skeleton className="h-4 w-24" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-6 w-20" />
        ))}
      </div>

      {/* Results count */}
      <Skeleton className="h-4 w-40 mb-6" />

      {/* Sections */}
      <div className="space-y-12">
        {[1, 2, 3].map((section) => (
          <div key={section}>
            <Skeleton className="h-6 w-32 mb-6" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <SkeletonPersonCard key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
