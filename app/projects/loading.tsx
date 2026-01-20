import { Skeleton, SkeletonProjectCard } from '@/components/ui'

export default function ProjectsLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-6 w-96" />
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-20" />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-16" />
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonProjectCard key={i} />
        ))}
      </div>
    </div>
  )
}
