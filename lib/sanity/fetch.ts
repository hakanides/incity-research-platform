import { client, isSanityConfigured } from './client'
import {
  personQuery,
  allPeopleQuery,
  publicationQuery,
  allPublicationsQuery,
  projectQuery,
  allProjectsQuery,
} from './queries'
import type { Person, Publication, Project, PublicationFilters, ProjectFilters } from '@/types'

/**
 * Fetches a single person by slug
 */
export async function getPerson(slug: string): Promise<Person | null> {
  if (!slug || !isSanityConfigured) return null

  try {
    const person = await client.fetch<Person | null>(personQuery, { slug })
    return person
  } catch (error) {
    console.error('Error fetching person:', error)
    return null
  }
}

/**
 * Fetches all people, optionally filtered by role
 */
export async function getAllPeople(role?: Person['role']): Promise<Person[]> {
  if (!isSanityConfigured) return []

  try {
    let query = allPeopleQuery
    const params: Record<string, string> = {}

    if (role) {
      query = `*[_type == "person" && role == $role] | order(name asc){
        _id,
        _type,
        name,
        slug,
        role,
        photo
      }`
      params.role = role
    }

    const people = await client.fetch<Person[]>(query, params)
    return people || []
  } catch (error) {
    console.error('Error fetching people:', error)
    return []
  }
}

/**
 * Fetches a single publication by slug
 */
export async function getPublication(slug: string): Promise<Publication | null> {
  if (!slug || !isSanityConfigured) return null

  try {
    const publication = await client.fetch<Publication | null>(publicationQuery, { slug })
    return publication
  } catch (error) {
    console.error('Error fetching publication:', error)
    return null
  }
}

/**
 * Fetches all publications with optional filters
 */
export async function getAllPublications(filters?: PublicationFilters): Promise<Publication[]> {
  if (!isSanityConfigured) return []

  try {
    let query = allPublicationsQuery
    const params: Record<string, unknown> = {}

    if (filters) {
      const conditions: string[] = ['_type == "publication"']

      if (filters.year) {
        conditions.push('dateTime(publishedAt).year == $year')
        params.year = filters.year
      }

      if (filters.documentType) {
        conditions.push('documentType == $documentType')
        params.documentType = filters.documentType
      }

      if (filters.authorId) {
        conditions.push('$authorId in authors[]._ref')
        params.authorId = filters.authorId
      }

      if (filters.searchQuery) {
        conditions.push('title match $searchQuery')
        params.searchQuery = `*${filters.searchQuery}*`
      }

      query = `*[${conditions.join(' && ')}] | order(publishedAt desc){
        _id,
        _type,
        title,
        slug,
        authors[]->{_id, name, slug},
        publishedAt,
        documentType,
        tags
      }`
    }

    const publications = await client.fetch<Publication[]>(query, params)
    return publications || []
  } catch (error) {
    console.error('Error fetching publications:', error)
    return []
  }
}

/**
 * Fetches a single project by slug
 */
export async function getProject(slug: string): Promise<Project | null> {
  if (!slug || !isSanityConfigured) return null

  try {
    const project = await client.fetch<Project | null>(projectQuery, { slug })
    return project
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

/**
 * Fetches all projects with optional filters
 */
export async function getAllProjects(filters?: ProjectFilters): Promise<Project[]> {
  if (!isSanityConfigured) return []

  try {
    let query = allProjectsQuery
    const params: Record<string, unknown> = {}

    if (filters) {
      const conditions: string[] = ['_type == "project"']

      if (filters.theme) {
        conditions.push('theme == $theme')
        params.theme = filters.theme
      }

      if (filters.status) {
        conditions.push('status == $status')
        params.status = filters.status
      }

      if (filters.searchQuery) {
        conditions.push('headline match $searchQuery')
        params.searchQuery = `*${filters.searchQuery}*`
      }

      query = `*[${conditions.join(' && ')}] | order(startDate desc){
        _id,
        _type,
        headline,
        slug,
        theme,
        status,
        featuredImage,
        startDate,
        endDate
      }`
    }

    const projects = await client.fetch<Project[]>(query, params)
    return projects || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

/**
 * Fetches publication years for filter dropdowns
 */
export async function getPublicationYears(): Promise<number[]> {
  if (!isSanityConfigured) return []

  try {
    const query = `array::unique(*[_type == "publication" && defined(publishedAt)].publishedAt) | order(@ desc)`
    const dates = await client.fetch<string[]>(query)
    const years = dates
      .map((date) => new Date(date).getFullYear())
      .filter((year, index, arr) => arr.indexOf(year) === index)
      .sort((a, b) => b - a)
    return years
  } catch (error) {
    console.error('Error fetching publication years:', error)
    return []
  }
}

/**
 * Fetches document types that have publications
 */
export async function getDocumentTypes(): Promise<Publication['documentType'][]> {
  if (!isSanityConfigured) return []

  try {
    const query = `array::unique(*[_type == "publication"].documentType)`
    const types = await client.fetch<Publication['documentType'][]>(query)
    return types || []
  } catch (error) {
    console.error('Error fetching document types:', error)
    return []
  }
}
