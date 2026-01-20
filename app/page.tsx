import Link from 'next/link'
import { getAllProjects, getAllPublications, getAllPeople } from '@/lib/sanity'
import { ProjectCard } from '@/components/content'
import { PublicationCard } from '@/components/content'
import { PersonCard } from '@/components/content'
import { Button } from '@/components/ui'

export default async function HomePage() {
  const [projects, publications, people] = await Promise.all([
    getAllProjects({ status: 'active' }),
    getAllPublications(),
    getAllPeople(),
  ])

  const featuredProjects = projects.slice(0, 3)
  const recentPublications = publications.slice(0, 4)
  const teamMembers = people.filter((p) => p.role === 'director' || p.role === 'faculty').slice(0, 4)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Advancing Urban Research Through Collaboration
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-100">
              InCity Research is dedicated to understanding and improving urban environments
              through innovative research, data-driven insights, and cross-disciplinary collaboration.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/projects">
                <Button size="lg" variant="secondary">
                  Explore Projects
                </Button>
              </Link>
              <Link href="/publications">
                <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10">
                  View Publications
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Active Projects
              </h2>
              <p className="mt-2 text-gray-600">
                Explore our ongoing research initiatives
              </p>
            </div>
            <Link href="/projects" className="hidden md:block">
              <Button variant="outline">View All Projects</Button>
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No active projects at the moment.</p>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link href="/projects">
              <Button variant="outline">View All Projects</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Recent Publications
              </h2>
              <p className="mt-2 text-gray-600">
                Latest research papers and reports from our team
              </p>
            </div>
            <Link href="/publications" className="hidden md:block">
              <Button variant="outline">View All Publications</Button>
            </Link>
          </div>

          {recentPublications.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {recentPublications.map((publication) => (
                <PublicationCard key={publication._id} publication={publication} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No publications available yet.</p>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link href="/publications">
              <Button variant="outline">View All Publications</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Our Team
              </h2>
              <p className="mt-2 text-gray-600">
                Meet the researchers behind our work
              </p>
            </div>
            <Link href="/people" className="hidden md:block">
              <Button variant="outline">View All Team Members</Button>
            </Link>
          </div>

          {teamMembers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((person) => (
                <PersonCard key={person._id} person={person} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Team information coming soon.</p>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link href="/people">
              <Button variant="outline">View All Team Members</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Interested in Collaborating?
          </h2>
          <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
            We welcome partnerships with researchers, institutions, and organizations
            working to improve urban environments.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
