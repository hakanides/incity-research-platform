import { Skeleton, SkeletonProjectCard, SkeletonPublicationCard, SkeletonPersonCard } from '@/components/ui'

export default function HomeLoading() {
  return (
    <div className="flex flex-col">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <Skeleton className="h-12 w-3/4 bg-primary-500/30 mb-6" />
            <Skeleton className="h-6 w-full bg-primary-500/30 mb-2" />
            <Skeleton className="h-6 w-2/3 bg-primary-500/30 mb-8" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-40 bg-primary-500/30" />
              <Skeleton className="h-12 w-40 bg-primary-500/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-64 mb-8" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <SkeletonProjectCard key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section Skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-56 mb-2" />
          <Skeleton className="h-5 w-72 mb-8" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonPublicationCard key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-5 w-56 mb-8" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonPersonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
