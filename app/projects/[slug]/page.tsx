import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getProject, getAllProjects, urlFor } from '@/lib/sanity'
import { Badge, Button, Card, CardContent } from '@/components/ui'
import { ChartComponent } from '@/components/charts'
import { PersonCard } from '@/components/content'
import { PublicationCard } from '@/components/content'
import type { Project } from '@/types'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

const themeLabels: Record<Project['theme'], string> = {
  systems: 'Urban Systems',
  behavior: 'Human Behavior',
  policy: 'Policy & Planning',
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

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({
    slug: project.slug?.current || project._id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return { title: 'Project Not Found | InCity Research' }
  }

  return {
    title: `${project.headline} | InCity Research`,
    description: `Research project: ${project.headline}`,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const imageUrl = project.featuredImage?.asset
    ? urlFor(project.featuredImage).width(1200).height(600).url()
    : null

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    })
  }

  return (
    <article className="container mx-auto px-4 py-12">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 mb-6"
      >
        &larr; Back to Projects
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant={statusVariants[project.status]}>
            {statusLabels[project.status]}
          </Badge>
          <Badge variant="primary">{themeLabels[project.theme]}</Badge>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {project.headline}
        </h1>

        {project.startDate && (
          <p className="mt-4 text-gray-600">
            {formatDate(project.startDate)}
            {project.endDate ? ` - ${formatDate(project.endDate)}` : ' - Present'}
          </p>
        )}
      </header>

      {/* Featured Image */}
      {imageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.featuredImage?.alt || project.headline}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Description */}
          {project.description && project.description.length > 0 && (
            <Card className="mb-8">
              <CardContent className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">About This Project</h2>
                {project.description.map((block: any, index: number) => (
                  <p key={block._key || index} className="text-gray-700">
                    {block.children?.map((child: any) => child.text).join('')}
                  </p>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Chart Data */}
          {project.chartData && project.chartData.data && project.chartData.data.length > 0 && (
            <Card className="mb-8">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Project Data</h2>
                <ChartComponent data={project.chartData} height={350} />
              </CardContent>
            </Card>
          )}

          {/* Related Publications */}
          {project.relatedPublications && project.relatedPublications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Related Publications</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {project.relatedPublications.map((pub) => (
                  <PublicationCard key={pub._id} publication={pub} showTags={false} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside>
          {/* Team Members */}
          {project.teamDetails && project.teamDetails.length > 0 && (
            <Card>
              <CardContent>
                <h2 className="text-lg font-semibold mb-4">Team Members</h2>
                <div className="space-y-3">
                  {project.teamDetails.map((person) => (
                    <PersonCard
                      key={person._id}
                      person={person}
                      showRole={true}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </article>
  )
}
