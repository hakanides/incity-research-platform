import { Skeleton, SkeletonPersonCard } from '@/components/ui'

export default function PublicationDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back link */}
      <Skeleton className="h-4 w-40 mb-6" />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-5 w-64" />
          </div>

          {/* Abstract Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 mb-8">
            <Skeleton className="h-6 w-24 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Tags */}
          <div className="mb-8">
            <Skeleton className="h-6 w-24 mb-3" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-6 w-20" />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Actions Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <Skeleton className="h-6 w-16 mb-4" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Authors Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <Skeleton className="h-6 w-20 mb-4" />
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <SkeletonPersonCard key={i} />
              ))}
            </div>
          </div>

          {/* Citation Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <Skeleton className="h-6 w-20 mb-3" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </aside>
      </div>
    </div>
  )
}
