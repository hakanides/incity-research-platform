import { Skeleton, SkeletonPersonCard } from '@/components/ui'

export default function ProjectDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back link */}
      <Skeleton className="h-4 w-32 mb-6" />

      {/* Header */}
      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-28" />
        </div>
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-5 w-48" />
      </div>

      {/* Featured Image */}
      <Skeleton className="w-full h-64 md:h-96 mb-8 rounded-lg" />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Description Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 mb-8">
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Chart Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 mb-8">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <Skeleton className="h-6 w-36 mb-4" />
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <SkeletonPersonCard key={i} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
