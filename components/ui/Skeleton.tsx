'use client'

import { cn } from '@/lib/utils'

export interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200',
        className
      )}
    />
  )
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn('rounded-lg border border-gray-200 bg-white p-4', className)}>
      <Skeleton className="h-40 w-full mb-4" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

export function SkeletonPersonCard({ className }: SkeletonProps) {
  return (
    <div className={cn('rounded-lg border border-gray-200 bg-white p-4 flex items-center gap-4', className)}>
      <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
      <div className="flex-1">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}

export function SkeletonPublicationCard({ className }: SkeletonProps) {
  return (
    <div className={cn('rounded-lg border border-gray-200 bg-white p-4', className)}>
      <div className="flex justify-between mb-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-3/4 mb-3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

export function SkeletonProjectCard({ className }: SkeletonProps) {
  return (
    <div className={cn('rounded-lg border border-gray-200 bg-white overflow-hidden', className)}>
      <Skeleton className="h-40 w-full" />
      <div className="p-4">
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  )
}
