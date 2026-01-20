import { Skeleton, SkeletonPublicationCard, SkeletonProjectCard } from '@/components/ui'

export default function PersonDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back link */}
      <Skeleton className="h-4 w-28 mb-6" />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sidebar - Profile */}
        <aside>
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
            <Skeleton className="h-32 w-32 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-40 mx-auto mb-2" />
            <Skeleton className="h-6 w-20 mx-auto mb-6" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-48 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Biography Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <Skeleton className="h-6 w-28 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Publications */}
          <div>
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2].map((i) => (
                <SkeletonPublicationCard key={i} />
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2].map((i) => (
                <SkeletonProjectCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
