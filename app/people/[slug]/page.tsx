import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPerson, getAllPeople, getAllPublications, getAllProjects, urlFor } from '@/lib/sanity'
import { Badge, Card, CardContent } from '@/components/ui'
import { PublicationCard } from '@/components/content'
import { ProjectCard } from '@/components/content'
import type { Person } from '@/types'

interface PersonPageProps {
  params: Promise<{ slug: string }>
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

export async function generateStaticParams() {
  const people = await getAllPeople()
  return people.map((person) => ({
    slug: person.slug?.current || person._id,
  }))
}

export async function generateMetadata({ params }: PersonPageProps) {
  const { slug } = await params
  const person = await getPerson(slug)

  if (!person) {
    return { title: 'Person Not Found | InCity Research' }
  }

  return {
    title: `${person.name} | InCity Research`,
    description: `${person.name} - ${roleLabels[person.role]} at InCity Research`,
  }
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { slug } = await params
  const person = await getPerson(slug)

  if (!person) {
    notFound()
  }

  // Fetch publications and projects by this person
  const [allPublications, allProjects] = await Promise.all([
    getAllPublications({ authorId: person._id }),
    getAllProjects(),
  ])

  // Filter projects where this person is on the team
  const personProjects = allProjects.filter((project) =>
    project.team?.some((member) => member._ref === person._id)
  )

  const imageUrl = person.photo?.asset
    ? urlFor(person.photo).width(400).height(400).url()
    : null

  return (
    <article className="container mx-auto px-4 py-12">
      {/* Back link */}
      <Link
        href="/people"
        className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 mb-6"
      >
        &larr; Back to Team
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sidebar - Profile Info */}
        <aside>
          <Card>
            <CardContent className="text-center">
              {/* Photo */}
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={person.photo?.alt || `Photo of ${person.name}`}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-medium text-gray-400">
                    {person.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Name and Role */}
              <h1 className="text-2xl font-bold text-gray-900">{person.name}</h1>
              <Badge variant={roleVariants[person.role]} className="mt-2">
                {roleLabels[person.role]}
              </Badge>

              {/* Contact Info */}
              <div className="mt-6 space-y-2 text-sm">
                {person.email && (
                  <p>
                    <a
                      href={`mailto:${person.email}`}
                      className="text-primary-600 hover:underline"
                    >
                      {person.email}
                    </a>
                  </p>
                )}
                {person.linkedIn && (
                  <p>
                    <a
                      href={person.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Biography */}
          {person.bio && person.bio.length > 0 && (
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Biography</h2>
                <div className="prose max-w-none">
                  {person.bio.map((block: any, index: number) => (
                    <p key={block._key || index} className="text-gray-700">
                      {block.children?.map((child: any) => child.text).join('')}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Publications */}
          {allPublications.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Publications ({allPublications.length})
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {allPublications.map((publication) => (
                  <PublicationCard
                    key={publication._id}
                    publication={publication}
                    showAuthors={false}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {personProjects.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Projects ({personProjects.length})
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {personProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Empty state if no content */}
          {!person.bio?.length && allPublications.length === 0 && personProjects.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">
                  More information about {person.name} coming soon.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </article>
  )
}
