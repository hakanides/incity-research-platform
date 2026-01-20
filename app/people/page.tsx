import { Suspense } from 'react'
import { getAllPeople } from '@/lib/sanity'
import { PersonCard } from '@/components/content'
import { Badge } from '@/components/ui'
import type { Person } from '@/types'

interface PeoplePageProps {
  searchParams: Promise<{
    role?: Person['role']
  }>
}

export const metadata = {
  title: 'People | InCity Research',
  description: 'Meet our team of researchers, faculty, and staff at InCity Research.',
}

function PeopleGrid({ people }: { people: Person[] }) {
  if (people.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No team members found matching your criteria.</p>
      </div>
    )
  }

  // Group by role
  const directors = people.filter((p) => p.role === 'director')
  const faculty = people.filter((p) => p.role === 'faculty')
  const staff = people.filter((p) => p.role === 'staff')
  const students = people.filter((p) => p.role === 'student')
  const alumni = people.filter((p) => p.role === 'alumni')

  const sections = [
    { title: 'Leadership', people: directors },
    { title: 'Faculty', people: faculty },
    { title: 'Staff', people: staff },
    { title: 'Students', people: students },
    { title: 'Alumni', people: alumni },
  ].filter((section) => section.people.length > 0)

  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{section.title}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {section.people.map((person) => (
              <PersonCard key={person._id} person={person} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function FilteredPeopleGrid({ people }: { people: Person[] }) {
  if (people.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No team members found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {people.map((person) => (
        <PersonCard key={person._id} person={person} />
      ))}
    </div>
  )
}

export default async function PeoplePage({ searchParams }: PeoplePageProps) {
  const params = await searchParams
  const people = await getAllPeople(params.role)

  const roles: { value: Person['role']; label: string }[] = [
    { value: 'director', label: 'Leadership' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'staff', label: 'Staff' },
    { value: 'student', label: 'Students' },
    { value: 'alumni', label: 'Alumni' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Our Team</h1>
        <p className="mt-2 text-lg text-gray-600">
          Meet the researchers and staff behind InCity Research
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700 mr-2">Filter by role:</span>
        <a href="/people">
          <Badge variant={!params.role ? 'primary' : 'default'} size="sm">All</Badge>
        </a>
        {roles.map((role) => (
          <a
            key={role.value}
            href={`/people?role=${role.value}`}
          >
            <Badge
              variant={params.role === role.value ? 'primary' : 'default'}
              size="sm"
            >
              {role.label}
            </Badge>
          </a>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing {people.length} team member{people.length !== 1 ? 's' : ''}
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12">Loading team members...</div>}>
        {params.role ? (
          <FilteredPeopleGrid people={people} />
        ) : (
          <PeopleGrid people={people} />
        )}
      </Suspense>
    </div>
  )
}
