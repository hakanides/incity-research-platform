// Person Schema Type
export interface Person {
  _id: string
  _type: 'person'
  name: string
  slug: { current: string }
  role: 'director' | 'faculty' | 'staff' | 'student' | 'alumni'
  photo?: {
    _type: 'image'
    asset: { _ref: string }
    alt?: string
  }
  bio?: any[] // Portable Text blocks
  email?: string
  linkedIn?: string
  // Computed/queried fields
  publications?: Publication[]
  projects?: Project[]
}

// Publication Schema Type
export interface Publication {
  _id: string
  _type: 'publication'
  title: string
  slug: { current: string }
  authors: { _ref: string }[] // References to Person documents
  authorDetails?: Person[] // Expanded author data (from query)
  publishedAt: string // ISO date
  abstract?: any[] // Portable Text blocks
  documentType: 'journal' | 'conference' | 'thesis' | 'report' | 'book-chapter'
  file?: {
    _type: 'file'
    asset: { _ref: string }
  }
  externalUrl?: string // DOI or external link
  tags?: string[]
}

// Chart Data Structure (for CMS-driven visualizations)
export interface ChartData {
  chartType: 'bar' | 'line' | 'pie' | 'area'
  title?: string
  data: {
    label: string
    value: number
  }[]
  xAxisLabel?: string
  yAxisLabel?: string
}

// Project Schema Type
export interface Project {
  _id: string
  _type: 'project'
  headline: string
  slug: { current: string }
  description?: any[] // Portable Text blocks
  theme: 'systems' | 'behavior' | 'policy'
  status: 'active' | 'completed' | 'planned'
  team: { _ref: string }[] // References to Person documents
  teamDetails?: Person[] // Expanded team data (from query)
  featuredImage?: {
    _type: 'image'
    asset: { _ref: string }
    alt?: string
  }
  chartData?: ChartData
  relatedPublications?: Publication[]
  startDate?: string
  endDate?: string
}

// API Response wrapper
export interface SanityResponse<T> {
  data: T
  error?: string
}

// Filter/Search types for Publications page
export interface PublicationFilters {
  year?: number
  documentType?: Publication['documentType']
  authorId?: string
  searchQuery?: string
}

// Filter types for Projects page
export interface ProjectFilters {
  theme?: Project['theme']
  status?: Project['status']
  searchQuery?: string
}
