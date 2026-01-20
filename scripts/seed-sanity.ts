/**
 * Sanity Seeding Script
 *
 * This script populates the Sanity CMS with initial content from mock data.
 * Run with: npm run seed
 *
 * Prerequisites:
 * - Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 * - Set SANITY_API_TOKEN in .env.local (requires write access)
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Sanity client with write access
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Placeholder image URLs (from Unsplash - free to use)
const PLACEHOLDER_IMAGES = {
  person: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
  ],
  project: [
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=400&fit=crop',
  ],
}

// ============================================================================
// MOCK DATA (simplified version of our test mocks)
// ============================================================================

interface SeedPerson {
  _id: string
  _type: 'person'
  name: string
  slug: { _type: 'slug'; current: string }
  role: 'director' | 'faculty' | 'staff' | 'student' | 'alumni'
  bio?: Array<{ _type: 'block'; _key: string; style: string; children: Array<{ _type: 'span'; _key: string; text: string; marks: string[] }>; markDefs: any[] }>
  email?: string
  linkedIn?: string
  imageIndex?: number
}

interface SeedPublication {
  _id: string
  _type: 'publication'
  title: string
  slug: { _type: 'slug'; current: string }
  authors: Array<{ _type: 'reference'; _ref: string }>
  publishedAt: string
  documentType: 'journal' | 'conference' | 'thesis' | 'report' | 'book-chapter'
  abstract?: Array<{ _type: 'block'; _key: string; style: string; children: Array<{ _type: 'span'; _key: string; text: string; marks: string[] }>; markDefs: any[] }>
  externalUrl?: string
  tags?: string[]
}

interface SeedProject {
  _id: string
  _type: 'project'
  headline: string
  slug: { _type: 'slug'; current: string }
  description?: Array<{ _type: 'block'; _key: string; style: string; children: Array<{ _type: 'span'; _key: string; text: string; marks: string[] }>; markDefs: any[] }>
  theme: 'systems' | 'behavior' | 'policy'
  status: 'active' | 'completed' | 'planned'
  team: Array<{ _type: 'reference'; _ref: string }>
  chartData?: {
    chartType: 'bar' | 'line' | 'pie' | 'area'
    title?: string
    data: Array<{ label: string; value: number }>
    xAxisLabel?: string
    yAxisLabel?: string
  }
  relatedPublications?: Array<{ _type: 'reference'; _ref: string }>
  startDate?: string
  endDate?: string
  imageIndex?: number
}

// Helper to create a text block
const createTextBlock = (text: string, key: string) => ({
  _type: 'block' as const,
  _key: key,
  style: 'normal',
  children: [{ _type: 'span' as const, _key: `${key}-span`, text, marks: [] }],
  markDefs: [],
})

// Seed People Data
const seedPeople: SeedPerson[] = [
  {
    _id: 'person-sarah-chen',
    _type: 'person',
    name: 'Dr. Sarah Chen',
    slug: { _type: 'slug', current: 'sarah-chen' },
    role: 'director',
    bio: [createTextBlock('Dr. Sarah Chen is the founding director of InCity Research, specializing in urban systems and smart city technologies. With over 15 years of experience in urban planning and data science, she leads groundbreaking research on sustainable urban development.', 'bio-1')],
    email: 'sarah.chen@incity.edu',
    linkedIn: 'https://linkedin.com/in/sarahchen',
    imageIndex: 0,
  },
  {
    _id: 'person-michael-torres',
    _type: 'person',
    name: 'Prof. Michael Torres',
    slug: { _type: 'slug', current: 'michael-torres' },
    role: 'faculty',
    bio: [createTextBlock('Prof. Torres leads research on human behavior in urban environments with a focus on pedestrian mobility patterns. His work combines computer vision techniques with urban sociology to understand how people navigate cities.', 'bio-2')],
    email: 'michael.torres@incity.edu',
    imageIndex: 1,
  },
  {
    _id: 'person-emily-rodriguez',
    _type: 'person',
    name: 'Emily Rodriguez',
    slug: { _type: 'slug', current: 'emily-rodriguez' },
    role: 'staff',
    bio: [createTextBlock('Emily manages research operations and coordinates between academic teams and community partners. She ensures our research reaches the people who can benefit from it most.', 'bio-3')],
    email: 'emily.rodriguez@incity.edu',
    imageIndex: 2,
  },
  {
    _id: 'person-james-park',
    _type: 'person',
    name: 'James Park',
    slug: { _type: 'slug', current: 'james-park' },
    role: 'student',
    bio: [createTextBlock('PhD candidate researching urban policy impacts on housing affordability. James uses econometric models to evaluate the effectiveness of housing policies across different metropolitan areas.', 'bio-4')],
    email: 'james.park@incity.edu',
    imageIndex: 3,
  },
  {
    _id: 'person-lisa-wang',
    _type: 'person',
    name: 'Dr. Lisa Wang',
    slug: { _type: 'slug', current: 'lisa-wang' },
    role: 'alumni',
    bio: [createTextBlock('Dr. Wang completed her postdoctoral research at InCity and now leads the Urban Climate Initiative at Stanford. She continues to collaborate with us on climate resilience projects.', 'bio-5')],
    email: 'lisa.wang@stanford.edu',
    linkedIn: 'https://linkedin.com/in/lisawang',
    imageIndex: 4,
  },
]

// Seed Publications Data
const seedPublications: SeedPublication[] = [
  {
    _id: 'pub-smart-city-infrastructure',
    _type: 'publication',
    title: 'Smart City Infrastructure: A Comprehensive Analysis of Urban Sensor Networks',
    slug: { _type: 'slug', current: 'smart-city-infrastructure-analysis' },
    authors: [
      { _type: 'reference', _ref: 'person-sarah-chen' },
      { _type: 'reference', _ref: 'person-michael-torres' },
    ],
    publishedAt: '2024-03-15',
    documentType: 'journal',
    abstract: [createTextBlock('This paper presents a comprehensive analysis of urban sensor network deployments across 15 major cities, examining their effectiveness in monitoring air quality, traffic flow, and energy consumption. Our findings suggest that integrated sensor networks can reduce urban management costs by up to 23% while improving response times to environmental hazards.', 'abs-1')],
    externalUrl: 'https://doi.org/10.1234/smartcity.2024.001',
    tags: ['smart city', 'sensors', 'urban infrastructure', 'IoT'],
  },
  {
    _id: 'pub-pedestrian-flow',
    _type: 'publication',
    title: 'Pedestrian Flow Patterns in Mixed-Use Urban Districts',
    slug: { _type: 'slug', current: 'pedestrian-flow-patterns' },
    authors: [{ _type: 'reference', _ref: 'person-michael-torres' }],
    publishedAt: '2024-01-20',
    documentType: 'conference',
    abstract: [createTextBlock('Using mobile phone data and computer vision techniques, this study reveals how pedestrians navigate mixed-use districts during different times of day. We identified three distinct flow patterns that correlate with commercial activity levels.', 'abs-2')],
    tags: ['pedestrian', 'mobility', 'urban planning', 'mixed-use'],
  },
  {
    _id: 'pub-housing-affordability',
    _type: 'publication',
    title: 'Housing Affordability and Urban Policy: A Longitudinal Study',
    slug: { _type: 'slug', current: 'housing-affordability-policy' },
    authors: [
      { _type: 'reference', _ref: 'person-james-park' },
      { _type: 'reference', _ref: 'person-sarah-chen' },
    ],
    publishedAt: '2023-11-05',
    documentType: 'thesis',
    abstract: [createTextBlock('This dissertation examines the long-term effects of zoning reform on housing affordability in 12 US metropolitan areas over a 20-year period. Results indicate that inclusionary zoning policies show significant positive effects only when combined with density bonuses.', 'abs-3')],
    tags: ['housing', 'policy', 'affordability', 'zoning'],
  },
  {
    _id: 'pub-urban-heat-island',
    _type: 'publication',
    title: 'Urban Heat Island Mitigation Strategies: Technical Report',
    slug: { _type: 'slug', current: 'urban-heat-island-report' },
    authors: [
      { _type: 'reference', _ref: 'person-sarah-chen' },
      { _type: 'reference', _ref: 'person-lisa-wang' },
    ],
    publishedAt: '2023-08-12',
    documentType: 'report',
    abstract: [createTextBlock('This technical report evaluates 15 urban heat island mitigation strategies across different climate zones. Green roofs and increased tree canopy coverage showed the most consistent temperature reductions, averaging 2.3°C in summer months.', 'abs-4')],
    externalUrl: 'https://incity.edu/reports/uhi-2023',
    tags: ['climate', 'urban heat', 'mitigation', 'green infrastructure'],
  },
  {
    _id: 'pub-data-driven-planning',
    _type: 'publication',
    title: 'Data-Driven Urban Planning: Methods and Applications',
    slug: { _type: 'slug', current: 'data-driven-urban-planning' },
    authors: [
      { _type: 'reference', _ref: 'person-michael-torres' },
      { _type: 'reference', _ref: 'person-james-park' },
    ],
    publishedAt: '2024-02-28',
    documentType: 'book-chapter',
    abstract: [createTextBlock('This chapter explores how big data analytics can inform urban planning decisions, with case studies from transportation, housing, and environmental management. We present a framework for integrating multiple data sources into planning workflows.', 'abs-5')],
    tags: ['data analytics', 'urban planning', 'big data', 'methodology'],
  },
]

// Seed Projects Data
const seedProjects: SeedProject[] = [
  {
    _id: 'project-smart-traffic',
    _type: 'project',
    headline: 'Smart Traffic Management System',
    slug: { _type: 'slug', current: 'smart-traffic-management' },
    description: [createTextBlock('Developing an AI-powered traffic management system that uses real-time sensor data to optimize signal timing and reduce congestion. The system has been piloted at 12 intersections and reduced average commute times by 18%.', 'desc-1')],
    theme: 'systems',
    status: 'active',
    team: [
      { _type: 'reference', _ref: 'person-sarah-chen' },
      { _type: 'reference', _ref: 'person-michael-torres' },
    ],
    chartData: {
      chartType: 'bar',
      title: 'Traffic Reduction by Intersection',
      data: [
        { label: 'Main & 1st', value: 22 },
        { label: 'Oak & 5th', value: 18 },
        { label: 'Park Ave', value: 15 },
        { label: 'Downtown', value: 24 },
        { label: 'University', value: 12 },
      ],
      xAxisLabel: 'Intersection',
      yAxisLabel: 'Delay Reduction (%)',
    },
    relatedPublications: [{ _type: 'reference', _ref: 'pub-smart-city-infrastructure' }],
    startDate: '2023-01-15',
    endDate: '2025-12-31',
    imageIndex: 0,
  },
  {
    _id: 'project-urban-mobility',
    _type: 'project',
    headline: 'Urban Mobility Patterns Study',
    slug: { _type: 'slug', current: 'urban-mobility-patterns' },
    description: [createTextBlock('A comprehensive study of how residents move through the city using anonymized mobile data and surveys. Our findings are informing the city\'s new transportation master plan.', 'desc-2')],
    theme: 'behavior',
    status: 'active',
    team: [
      { _type: 'reference', _ref: 'person-michael-torres' },
      { _type: 'reference', _ref: 'person-james-park' },
    ],
    chartData: {
      chartType: 'line',
      title: 'Daily Mobility Index',
      data: [
        { label: '6am', value: 15 },
        { label: '9am', value: 85 },
        { label: '12pm', value: 45 },
        { label: '3pm', value: 55 },
        { label: '6pm', value: 90 },
        { label: '9pm', value: 30 },
      ],
      xAxisLabel: 'Time of Day',
      yAxisLabel: 'Mobility Index',
    },
    relatedPublications: [
      { _type: 'reference', _ref: 'pub-pedestrian-flow' },
      { _type: 'reference', _ref: 'pub-data-driven-planning' },
    ],
    startDate: '2022-06-01',
    imageIndex: 1,
  },
  {
    _id: 'project-affordable-housing',
    _type: 'project',
    headline: 'Affordable Housing Policy Framework',
    slug: { _type: 'slug', current: 'affordable-housing-policy' },
    description: [createTextBlock('Developing evidence-based policy recommendations for improving housing affordability in metropolitan areas. Our framework has been adopted by three city governments.', 'desc-3')],
    theme: 'policy',
    status: 'completed',
    team: [
      { _type: 'reference', _ref: 'person-sarah-chen' },
      { _type: 'reference', _ref: 'person-james-park' },
    ],
    chartData: {
      chartType: 'pie',
      title: 'Housing Cost Burden Distribution',
      data: [
        { label: 'Affordable (<30%)', value: 45 },
        { label: 'Moderate (30-50%)', value: 30 },
        { label: 'Severe (>50%)', value: 25 },
      ],
    },
    relatedPublications: [{ _type: 'reference', _ref: 'pub-housing-affordability' }],
    startDate: '2021-03-01',
    endDate: '2023-12-15',
    imageIndex: 2,
  },
  {
    _id: 'project-climate-resilience',
    _type: 'project',
    headline: 'Climate Resilient Infrastructure Initiative',
    slug: { _type: 'slug', current: 'climate-resilient-infrastructure' },
    description: [createTextBlock('Planning phase for a multi-year initiative to develop guidelines for climate-resilient urban infrastructure. We are partnering with 5 cities to pilot our recommendations.', 'desc-4')],
    theme: 'systems',
    status: 'planned',
    team: [
      { _type: 'reference', _ref: 'person-sarah-chen' },
      { _type: 'reference', _ref: 'person-lisa-wang' },
    ],
    chartData: {
      chartType: 'area',
      title: 'Projected Climate Risk Index',
      data: [
        { label: '2025', value: 42 },
        { label: '2030', value: 55 },
        { label: '2035', value: 68 },
        { label: '2040', value: 78 },
        { label: '2045', value: 85 },
        { label: '2050', value: 92 },
      ],
      xAxisLabel: 'Year',
      yAxisLabel: 'Risk Index',
    },
    relatedPublications: [{ _type: 'reference', _ref: 'pub-urban-heat-island' }],
    startDate: '2025-01-01',
    imageIndex: 3,
  },
]

// ============================================================================
// SEEDING FUNCTIONS
// ============================================================================

async function uploadImageFromUrl(url: string, filename: string): Promise<string | null> {
  try {
    console.log(`  Uploading image: ${filename}...`)
    const response = await fetch(url)
    if (!response.ok) {
      console.log(`  Warning: Could not fetch image from ${url}`)
      return null
    }
    const buffer = await response.arrayBuffer()
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename,
    })
    return asset._id
  } catch (error) {
    console.log(`  Warning: Failed to upload image ${filename}:`, error)
    return null
  }
}

async function seedPeopleData(): Promise<Map<string, string>> {
  console.log('\n📋 Seeding People...')
  const idMap = new Map<string, string>()

  for (let i = 0; i < seedPeople.length; i++) {
    const person = seedPeople[i]
    console.log(`  Creating: ${person.name}`)

    // Upload image
    let photoAsset = null
    const imageUrl = PLACEHOLDER_IMAGES.person[person.imageIndex ?? i % PLACEHOLDER_IMAGES.person.length]
    const assetId = await uploadImageFromUrl(imageUrl, `${person.slug.current}.jpg`)
    if (assetId) {
      photoAsset = {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
        alt: `Photo of ${person.name}`,
      }
    }

    const doc = {
      _id: person._id,
      _type: person._type,
      name: person.name,
      slug: person.slug,
      role: person.role,
      bio: person.bio,
      email: person.email,
      linkedIn: person.linkedIn,
      ...(photoAsset && { photo: photoAsset }),
    }

    const result = await client.createOrReplace(doc)
    idMap.set(person._id, result._id)
    console.log(`  ✓ Created: ${person.name} (${result._id})`)
  }

  return idMap
}

async function seedPublicationsData(): Promise<Map<string, string>> {
  console.log('\n📚 Seeding Publications...')
  const idMap = new Map<string, string>()

  for (const pub of seedPublications) {
    console.log(`  Creating: ${pub.title.substring(0, 50)}...`)

    const doc = {
      _id: pub._id,
      _type: pub._type,
      title: pub.title,
      slug: pub.slug,
      authors: pub.authors,
      publishedAt: pub.publishedAt,
      documentType: pub.documentType,
      abstract: pub.abstract,
      externalUrl: pub.externalUrl,
      tags: pub.tags,
    }

    const result = await client.createOrReplace(doc)
    idMap.set(pub._id, result._id)
    console.log(`  ✓ Created: ${pub.title.substring(0, 40)}... (${result._id})`)
  }

  return idMap
}

async function seedProjectsData(): Promise<void> {
  console.log('\n🏗️  Seeding Projects...')

  for (let i = 0; i < seedProjects.length; i++) {
    const project = seedProjects[i]
    console.log(`  Creating: ${project.headline}`)

    // Upload featured image
    let featuredImageAsset = null
    const imageUrl = PLACEHOLDER_IMAGES.project[project.imageIndex ?? i % PLACEHOLDER_IMAGES.project.length]
    const assetId = await uploadImageFromUrl(imageUrl, `${project.slug.current}.jpg`)
    if (assetId) {
      featuredImageAsset = {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
        alt: project.headline,
      }
    }

    const doc = {
      _id: project._id,
      _type: project._type,
      headline: project.headline,
      slug: project.slug,
      description: project.description,
      theme: project.theme,
      status: project.status,
      team: project.team,
      chartData: project.chartData,
      relatedPublications: project.relatedPublications,
      startDate: project.startDate,
      endDate: project.endDate,
      ...(featuredImageAsset && { featuredImage: featuredImageAsset }),
    }

    const result = await client.createOrReplace(doc)
    console.log(`  ✓ Created: ${project.headline} (${result._id})`)
  }
}

async function clearExistingData(): Promise<void> {
  console.log('\n🗑️  Clearing existing data...')

  // Delete in reverse order of dependencies
  const projectIds = await client.fetch<string[]>(`*[_type == "project"]._id`)
  if (projectIds.length > 0) {
    console.log(`  Deleting ${projectIds.length} projects...`)
    await client.delete({ query: '*[_type == "project"]' })
  }

  const pubIds = await client.fetch<string[]>(`*[_type == "publication"]._id`)
  if (pubIds.length > 0) {
    console.log(`  Deleting ${pubIds.length} publications...`)
    await client.delete({ query: '*[_type == "publication"]' })
  }

  const personIds = await client.fetch<string[]>(`*[_type == "person"]._id`)
  if (personIds.length > 0) {
    console.log(`  Deleting ${personIds.length} people...`)
    await client.delete({ query: '*[_type == "person"]' })
  }

  console.log('  ✓ Existing data cleared')
}

async function main(): Promise<void> {
  console.log('═══════════════════════════════════════════════════════════')
  console.log('  InCity Research Platform - Sanity Seeding Script')
  console.log('═══════════════════════════════════════════════════════════')

  // Validate configuration
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'your-project-id') {
    console.error('\n❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not configured.')
    console.error('   Please set it in your .env.local file.')
    process.exit(1)
  }

  if (!process.env.SANITY_API_TOKEN) {
    console.error('\n❌ Error: SANITY_API_TOKEN is not configured.')
    console.error('   Please set it in your .env.local file.')
    console.error('   Generate a token at: https://sanity.io/manage')
    process.exit(1)
  }

  console.log(`\nProject ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)

  try {
    // Clear existing data (optional - comment out to append)
    await clearExistingData()

    // Seed in order of dependencies
    await seedPeopleData()
    await seedPublicationsData()
    await seedProjectsData()

    console.log('\n═══════════════════════════════════════════════════════════')
    console.log('  ✅ Seeding complete!')
    console.log('═══════════════════════════════════════════════════════════')
    console.log('\nSummary:')
    console.log(`  • ${seedPeople.length} People created`)
    console.log(`  • ${seedPublications.length} Publications created`)
    console.log(`  • ${seedProjects.length} Projects created`)
    console.log('\nNext steps:')
    console.log('  1. Visit your Sanity Studio to review the content')
    console.log('  2. Run "npm run dev" to see your populated site')
    console.log('  3. Customize the content as needed\n')

  } catch (error) {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  }
}

// Run the script
main()
