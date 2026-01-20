import { Suspense } from 'react'
import { getAllPublications, getPublicationYears } from '@/lib/sanity'
import { PublicationCard } from '@/components/content'
import { Badge } from '@/components/ui'
import type { Publication } from '@/types'

interface PublicationsPageProps {
  searchParams: Promise<{
    type?: Publication['documentType']
    year?: string
  }>
}

export const metadata = {
  title: 'Publications | InCity Research',
  description: 'Browse our research publications, papers, and reports on urban studies.',
}

function PublicationsGrid({ publications }: { publications: Publication[] }) {
  if (publications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No publications found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {publications.map((publication) => (
        <PublicationCard key={publication._id} publication={publication} />
      ))}
    </div>
  )
}

export default async function PublicationsPage({ searchParams }: PublicationsPageProps) {
  const params = await searchParams
  const yearFilter = params.year ? parseInt(params.year, 10) : undefined

  const [publications, years] = await Promise.all([
    getAllPublications({
      documentType: params.type,
      year: yearFilter,
    }),
    getPublicationYears(),
  ])

  const documentTypes: { value: Publication['documentType']; label: string }[] = [
    { value: 'journal', label: 'Journal Articles' },
    { value: 'conference', label: 'Conference Papers' },
    { value: 'thesis', label: 'Theses' },
    { value: 'report', label: 'Reports' },
    { value: 'book-chapter', label: 'Book Chapters' },
  ]

  const buildUrl = (newType?: string, newYear?: string) => {
    const typeParam = newType || params.type
    const yearParam = newYear || params.year
    const queryParts: string[] = []
    if (typeParam) queryParts.push(`type=${typeParam}`)
    if (yearParam) queryParts.push(`year=${yearParam}`)
    return `/publications${queryParts.length ? `?${queryParts.join('&')}` : ''}`
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Publications</h1>
        <p className="mt-2 text-lg text-gray-600">
          Research papers, reports, and academic publications from our team
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700 mr-2">Type:</span>
          <a href={params.year ? `/publications?year=${params.year}` : '/publications'}>
            <Badge variant={!params.type ? 'primary' : 'default'} size="sm">All</Badge>
          </a>
          {documentTypes.map((type) => (
            <a
              key={type.value}
              href={buildUrl(type.value, params.year)}
            >
              <Badge
                variant={params.type === type.value ? 'primary' : 'default'}
                size="sm"
              >
                {type.label}
              </Badge>
            </a>
          ))}
        </div>

        {years.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Year:</span>
            <a href={params.type ? `/publications?type=${params.type}` : '/publications'}>
              <Badge variant={!params.year ? 'primary' : 'default'} size="sm">All</Badge>
            </a>
            {years.slice(0, 10).map((year) => (
              <a
                key={year}
                href={buildUrl(params.type, year.toString())}
              >
                <Badge
                  variant={params.year === year.toString() ? 'primary' : 'default'}
                  size="sm"
                >
                  {year}
                </Badge>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing {publications.length} publication{publications.length !== 1 ? 's' : ''}
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12">Loading publications...</div>}>
        <PublicationsGrid publications={publications} />
      </Suspense>
    </div>
  )
}
