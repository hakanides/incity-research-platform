'use client'

import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui'
import { Badge } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { Publication } from '@/types'

export interface PublicationCardProps {
  publication: Publication
  className?: string
  showAuthors?: boolean
  showTags?: boolean
}

const documentTypeLabels: Record<Publication['documentType'], string> = {
  journal: 'Journal Article',
  conference: 'Conference Paper',
  thesis: 'Thesis',
  report: 'Report',
  'book-chapter': 'Book Chapter',
}

const documentTypeVariants: Record<Publication['documentType'], 'primary' | 'success' | 'warning' | 'default' | 'error'> = {
  journal: 'primary',
  conference: 'success',
  thesis: 'warning',
  report: 'default',
  'book-chapter': 'error',
}

export function PublicationCard({
  publication,
  className,
  showAuthors = true,
  showTags = true,
}: PublicationCardProps) {
  const year = publication.publishedAt
    ? new Date(publication.publishedAt).getFullYear()
    : null

  const authors = publication.authorDetails || []
  const authorNames = authors.map((a) => a.name).join(', ')

  return (
    <Link
      href={`/publications/${publication.slug?.current || publication._id}`}
      className="block"
    >
      <Card
        className={cn(
          'h-full overflow-hidden transition-shadow hover:shadow-md',
          className
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <Badge
              variant={documentTypeVariants[publication.documentType]}
              size="sm"
            >
              {documentTypeLabels[publication.documentType]}
            </Badge>
            {year && (
              <span className="text-sm text-gray-500 flex-shrink-0">{year}</span>
            )}
          </div>

          <h3 className="mt-3 font-medium text-gray-900 line-clamp-2">
            {publication.title}
          </h3>

          {showAuthors && authorNames && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-1">
              {authorNames}
            </p>
          )}
        </CardContent>

        {showTags && publication.tags && publication.tags.length > 0 && (
          <CardFooter className="px-4 py-3 bg-gray-50">
            <div className="flex flex-wrap gap-1">
              {publication.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
              {publication.tags.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{publication.tags.length - 3} more
                </span>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  )
}
