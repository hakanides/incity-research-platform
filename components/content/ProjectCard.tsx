'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui'
import { Badge } from '@/components/ui'
import { urlFor } from '@/lib/sanity'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

export interface ProjectCardProps {
  project: Project
  className?: string
  showStatus?: boolean
  showTheme?: boolean
  showDates?: boolean
}

const themeLabels: Record<Project['theme'], string> = {
  systems: 'Urban Systems',
  behavior: 'Human Behavior',
  policy: 'Policy & Planning',
}

const themeVariants: Record<Project['theme'], 'primary' | 'success' | 'warning'> = {
  systems: 'primary',
  behavior: 'success',
  policy: 'warning',
}

const statusLabels: Record<Project['status'], string> = {
  active: 'Active',
  completed: 'Completed',
  planned: 'Planned',
}

const statusVariants: Record<Project['status'], 'success' | 'default' | 'warning'> = {
  active: 'success',
  completed: 'default',
  planned: 'warning',
}

function formatDate(dateString?: string): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}

export function ProjectCard({
  project,
  className,
  showStatus = true,
  showTheme = true,
  showDates = true,
}: ProjectCardProps) {
  const imageUrl = project.featuredImage?.asset
    ? urlFor(project.featuredImage).width(400).height(200).url()
    : null

  const dateRange = showDates && project.startDate
    ? `${formatDate(project.startDate)}${project.endDate ? ` - ${formatDate(project.endDate)}` : ' - Present'}`
    : null

  return (
    <Link
      href={`/projects/${project.slug?.current || project._id}`}
      className="block"
    >
      <Card
        className={cn(
          'h-full overflow-hidden transition-shadow hover:shadow-md',
          className
        )}
      >
        {imageUrl && (
          <div className="relative h-40 w-full bg-gray-100">
            <Image
              src={imageUrl}
              alt={project.featuredImage?.alt || project.headline}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <CardContent className={cn('p-4', !imageUrl && 'pt-4')}>
          <div className="flex flex-wrap items-center gap-2">
            {showStatus && (
              <Badge variant={statusVariants[project.status]} size="sm">
                {statusLabels[project.status]}
              </Badge>
            )}
            {showTheme && (
              <Badge variant={themeVariants[project.theme]} size="sm">
                {themeLabels[project.theme]}
              </Badge>
            )}
          </div>

          <h3 className="mt-3 font-medium text-gray-900 line-clamp-2">
            {project.headline}
          </h3>

          {dateRange && (
            <p className="mt-2 text-sm text-gray-500">{dateRange}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
