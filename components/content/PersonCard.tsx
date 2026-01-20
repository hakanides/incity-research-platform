'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui'
import { Badge } from '@/components/ui'
import { urlFor } from '@/lib/sanity'
import { cn } from '@/lib/utils'
import type { Person } from '@/types'

export interface PersonCardProps {
  person: Person
  className?: string
  showRole?: boolean
  linkToProfile?: boolean
}

const roleLabels: Record<Person['role'], string> = {
  director: 'Director',
  faculty: 'Faculty',
  staff: 'Staff',
  student: 'Student',
  alumni: 'Alumni',
}

const roleVariants: Record<Person['role'], 'primary' | 'success' | 'warning' | 'default'> = {
  director: 'primary',
  faculty: 'success',
  staff: 'default',
  student: 'warning',
  alumni: 'default',
}

export function PersonCard({
  person,
  className,
  showRole = true,
  linkToProfile = true,
}: PersonCardProps) {
  const imageUrl = person.photo?.asset
    ? urlFor(person.photo).width(200).height(200).url()
    : null

  const content = (
    <Card
      className={cn(
        'overflow-hidden transition-shadow hover:shadow-md',
        linkToProfile && 'cursor-pointer',
        className
      )}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={person.photo?.alt || `Photo of ${person.name}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-medium text-gray-400">
              {person.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{person.name}</h3>
          {showRole && (
            <Badge
              variant={roleVariants[person.role]}
              size="sm"
              className="mt-1"
            >
              {roleLabels[person.role]}
            </Badge>
          )}
          {person.email && (
            <p className="mt-1 text-sm text-gray-500 truncate">{person.email}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )

  if (linkToProfile && person.slug?.current) {
    return (
      <Link href={`/people/${person.slug.current}`} className="block">
        {content}
      </Link>
    )
  }

  return content
}
