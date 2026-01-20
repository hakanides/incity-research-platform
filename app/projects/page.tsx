import { Suspense } from 'react'
import { getAllProjects } from '@/lib/sanity'
import { ProjectCard } from '@/components/content'
import { Badge } from '@/components/ui'
import type { Project } from '@/types'

interface ProjectsPageProps {
  searchParams: Promise<{
    theme?: Project['theme']
    status?: Project['status']
  }>
}

export const metadata = {
  title: 'Projects | InCity Research',
  description: 'Explore our research projects on urban systems, human behavior, and policy.',
}

function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No projects found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  )
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams
  const projects = await getAllProjects({
    theme: params.theme,
    status: params.status,
  })

  const themes: { value: Project['theme']; label: string }[] = [
    { value: 'systems', label: 'Urban Systems' },
    { value: 'behavior', label: 'Human Behavior' },
    { value: 'policy', label: 'Policy & Planning' },
  ]

  const statuses: { value: Project['status']; label: string }[] = [
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'planned', label: 'Planned' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Research Projects</h1>
        <p className="mt-2 text-lg text-gray-600">
          Explore our ongoing and completed research initiatives
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <div>
          <span className="text-sm font-medium text-gray-700 mr-2">Theme:</span>
          <a
            href="/projects"
            className={`inline-block mr-2 ${!params.theme ? 'underline' : ''}`}
          >
            <Badge variant={!params.theme ? 'primary' : 'default'} size="sm">All</Badge>
          </a>
          {themes.map((theme) => (
            <a
              key={theme.value}
              href={`/projects?theme=${theme.value}${params.status ? `&status=${params.status}` : ''}`}
              className="inline-block mr-2"
            >
              <Badge
                variant={params.theme === theme.value ? 'primary' : 'default'}
                size="sm"
              >
                {theme.label}
              </Badge>
            </a>
          ))}
        </div>

        <div>
          <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
          <a
            href={params.theme ? `/projects?theme=${params.theme}` : '/projects'}
            className={`inline-block mr-2 ${!params.status ? 'underline' : ''}`}
          >
            <Badge variant={!params.status ? 'primary' : 'default'} size="sm">All</Badge>
          </a>
          {statuses.map((status) => (
            <a
              key={status.value}
              href={`/projects?status=${status.value}${params.theme ? `&theme=${params.theme}` : ''}`}
              className="inline-block mr-2"
            >
              <Badge
                variant={params.status === status.value ? 'primary' : 'default'}
                size="sm"
              >
                {status.label}
              </Badge>
            </a>
          ))}
        </div>
      </div>

      <Suspense fallback={<div className="text-center py-12">Loading projects...</div>}>
        <ProjectsGrid projects={projects} />
      </Suspense>
    </div>
  )
}
