import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPublication, getAllPublications } from '@/lib/sanity'
import { Badge, Button, Card, CardContent } from '@/components/ui'
import { PersonCard } from '@/components/content'
import type { Publication } from '@/types'

interface PublicationPageProps {
  params: Promise<{ slug: string }>
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

export async function generateStaticParams() {
  const publications = await getAllPublications()
  return publications.map((pub) => ({
    slug: pub.slug?.current || pub._id,
  }))
}

export async function generateMetadata({ params }: PublicationPageProps) {
  const { slug } = await params
  const publication = await getPublication(slug)

  if (!publication) {
    return { title: 'Publication Not Found | InCity Research' }
  }

  return {
    title: `${publication.title} | InCity Research`,
    description: `${documentTypeLabels[publication.documentType]}: ${publication.title}`,
  }
}

export default async function PublicationPage({ params }: PublicationPageProps) {
  const { slug } = await params
  const publication = await getPublication(slug)

  if (!publication) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const authors = publication.authorDetails || []

  return (
    <article className="container mx-auto px-4 py-12">
      {/* Back link */}
      <Link
        href="/publications"
        className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 mb-6"
      >
        &larr; Back to Publications
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant={documentTypeVariants[publication.documentType]}>
                {documentTypeLabels[publication.documentType]}
              </Badge>
              <span className="text-sm text-gray-500">
                {formatDate(publication.publishedAt)}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {publication.title}
            </h1>

            {authors.length > 0 && (
              <p className="mt-4 text-lg text-gray-600">
                {authors.map((author, index) => (
                  <span key={author._id}>
                    <Link
                      href={`/people/${author.slug?.current}`}
                      className="hover:text-primary-600 hover:underline"
                    >
                      {author.name}
                    </Link>
                    {index < authors.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            )}
          </header>

          {/* Abstract */}
          {publication.abstract && publication.abstract.length > 0 && (
            <Card className="mb-8">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Abstract</h2>
                <div className="prose max-w-none">
                  {publication.abstract.map((block: any, index: number) => (
                    <p key={block._key || index} className="text-gray-700">
                      {block.children?.map((child: any) => child.text).join('')}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {publication.tags && publication.tags.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Keywords</h2>
              <div className="flex flex-wrap gap-2">
                {publication.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Actions */}
          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-lg font-semibold">Access</h2>

              {publication.externalUrl && (
                <a
                  href={publication.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="primary" className="w-full">
                    View External Link
                  </Button>
                </a>
              )}

              {publication.file?.asset && (
                <Button variant="outline" className="w-full">
                  Download PDF
                </Button>
              )}

              {!publication.externalUrl && !publication.file?.asset && (
                <p className="text-sm text-gray-500">
                  No external link or file available.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Authors */}
          {authors.length > 0 && (
            <Card>
              <CardContent>
                <h2 className="text-lg font-semibold mb-4">Authors</h2>
                <div className="space-y-3">
                  {authors.map((author) => (
                    <PersonCard
                      key={author._id}
                      person={author}
                      showRole={false}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Citation Info */}
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold mb-3">Citation</h2>
              <p className="text-sm text-gray-600">
                {authors.map((a) => a.name).join(', ')} ({new Date(publication.publishedAt).getFullYear()}).{' '}
                <em>{publication.title}</em>. InCity Research.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </article>
  )
}
