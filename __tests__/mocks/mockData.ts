import type { Person, Publication, Project, ChartData } from '@/types'

// ============================================================================
// MOCK PEOPLE
// ============================================================================

export const mockPeople: Person[] = [
  {
    _id: 'person-1',
    _type: 'person',
    name: 'Dr. Sarah Chen',
    slug: { current: 'sarah-chen' },
    role: 'director',
    photo: {
      _type: 'image',
      asset: { _ref: 'image-abc123-800x600-jpg' },
      alt: 'Dr. Sarah Chen headshot',
    },
    bio: [
      {
        _type: 'block',
        _key: 'bio-block-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-1',
            text: 'Dr. Sarah Chen is the founding director of InCity Research, specializing in urban systems and smart city technologies.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    email: 'sarah.chen@incity.edu',
    linkedIn: 'https://linkedin.com/in/sarahchen',
  },
  {
    _id: 'person-2',
    _type: 'person',
    name: 'Prof. Michael Torres',
    slug: { current: 'michael-torres' },
    role: 'faculty',
    photo: {
      _type: 'image',
      asset: { _ref: 'image-def456-800x600-jpg' },
      alt: 'Prof. Michael Torres headshot',
    },
    bio: [
      {
        _type: 'block',
        _key: 'bio-block-2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-2',
            text: 'Prof. Torres leads research on human behavior in urban environments with a focus on pedestrian mobility patterns.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    email: 'michael.torres@incity.edu',
  },
  {
    _id: 'person-3',
    _type: 'person',
    name: 'Emily Rodriguez',
    slug: { current: 'emily-rodriguez' },
    role: 'staff',
    email: 'emily.rodriguez@incity.edu',
  },
  {
    _id: 'person-4',
    _type: 'person',
    name: 'James Park',
    slug: { current: 'james-park' },
    role: 'student',
    bio: [
      {
        _type: 'block',
        _key: 'bio-block-4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-4',
            text: 'PhD candidate researching urban policy impacts on housing affordability.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    email: 'james.park@incity.edu',
  },
  {
    _id: 'person-5',
    _type: 'person',
    name: 'Dr. Lisa Wang',
    slug: { current: 'lisa-wang' },
    role: 'alumni',
    email: 'lisa.wang@external.edu',
    linkedIn: 'https://linkedin.com/in/lisawang',
  },
]

// ============================================================================
// MOCK PUBLICATIONS
// ============================================================================

export const mockPublications: Publication[] = [
  {
    _id: 'pub-1',
    _type: 'publication',
    title: 'Smart City Infrastructure: A Comprehensive Analysis of Urban Sensor Networks',
    slug: { current: 'smart-city-infrastructure-analysis' },
    authors: [{ _ref: 'person-1' }, { _ref: 'person-2' }],
    authorDetails: [mockPeople[0], mockPeople[1]],
    publishedAt: '2024-03-15',
    documentType: 'journal',
    abstract: [
      {
        _type: 'block',
        _key: 'abstract-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-abs-1',
            text: 'This paper presents a comprehensive analysis of urban sensor network deployments across 15 major cities, examining their effectiveness in monitoring air quality, traffic flow, and energy consumption.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    externalUrl: 'https://doi.org/10.1234/smartcity.2024.001',
    tags: ['smart city', 'sensors', 'urban infrastructure', 'IoT'],
  },
  {
    _id: 'pub-2',
    _type: 'publication',
    title: 'Pedestrian Flow Patterns in Mixed-Use Urban Districts',
    slug: { current: 'pedestrian-flow-patterns' },
    authors: [{ _ref: 'person-2' }],
    authorDetails: [mockPeople[1]],
    publishedAt: '2024-01-20',
    documentType: 'conference',
    abstract: [
      {
        _type: 'block',
        _key: 'abstract-2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-abs-2',
            text: 'Using mobile phone data and computer vision techniques, this study reveals how pedestrians navigate mixed-use districts during different times of day.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    tags: ['pedestrian', 'mobility', 'urban planning'],
  },
  {
    _id: 'pub-3',
    _type: 'publication',
    title: 'Housing Affordability and Urban Policy: A Longitudinal Study',
    slug: { current: 'housing-affordability-policy' },
    authors: [{ _ref: 'person-4' }, { _ref: 'person-1' }],
    authorDetails: [mockPeople[3], mockPeople[0]],
    publishedAt: '2023-11-05',
    documentType: 'thesis',
    file: {
      _type: 'file',
      asset: { _ref: 'file-thesis-pdf-123' },
    },
    tags: ['housing', 'policy', 'affordability'],
  },
  {
    _id: 'pub-4',
    _type: 'publication',
    title: 'Urban Heat Island Mitigation Strategies: Technical Report',
    slug: { current: 'urban-heat-island-report' },
    authors: [{ _ref: 'person-1' }, { _ref: 'person-5' }],
    authorDetails: [mockPeople[0], mockPeople[4]],
    publishedAt: '2023-08-12',
    documentType: 'report',
    externalUrl: 'https://incity.edu/reports/uhi-2023',
    tags: ['climate', 'urban heat', 'mitigation'],
  },
  {
    _id: 'pub-5',
    _type: 'publication',
    title: 'Data-Driven Urban Planning: Methods and Applications',
    slug: { current: 'data-driven-urban-planning' },
    authors: [{ _ref: 'person-2' }, { _ref: 'person-4' }],
    authorDetails: [mockPeople[1], mockPeople[3]],
    publishedAt: '2024-02-28',
    documentType: 'book-chapter',
    abstract: [
      {
        _type: 'block',
        _key: 'abstract-5',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-abs-5',
            text: 'This chapter explores how big data analytics can inform urban planning decisions, with case studies from transportation, housing, and environmental management.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    tags: ['data analytics', 'urban planning', 'big data'],
  },
]

// ============================================================================
// MOCK CHART DATA
// ============================================================================

export const mockBarChartData: ChartData = {
  chartType: 'bar',
  title: 'Publications by Year',
  data: [
    { label: '2020', value: 12 },
    { label: '2021', value: 18 },
    { label: '2022', value: 24 },
    { label: '2023', value: 31 },
    { label: '2024', value: 15 },
  ],
  xAxisLabel: 'Year',
  yAxisLabel: 'Number of Publications',
}

export const mockLineChartData: ChartData = {
  chartType: 'line',
  title: 'Monthly Website Traffic',
  data: [
    { label: 'Jan', value: 4200 },
    { label: 'Feb', value: 4800 },
    { label: 'Mar', value: 5100 },
    { label: 'Apr', value: 4900 },
    { label: 'May', value: 5600 },
    { label: 'Jun', value: 6200 },
  ],
  xAxisLabel: 'Month',
  yAxisLabel: 'Visitors',
}

export const mockPieChartData: ChartData = {
  chartType: 'pie',
  title: 'Research Themes Distribution',
  data: [
    { label: 'Urban Systems', value: 45 },
    { label: 'Human Behavior', value: 30 },
    { label: 'Policy & Planning', value: 25 },
  ],
}

export const mockAreaChartData: ChartData = {
  chartType: 'area',
  title: 'Funding Over Time',
  data: [
    { label: '2019', value: 150000 },
    { label: '2020', value: 220000 },
    { label: '2021', value: 310000 },
    { label: '2022', value: 280000 },
    { label: '2023', value: 450000 },
  ],
  xAxisLabel: 'Year',
  yAxisLabel: 'Funding ($)',
}

// ============================================================================
// MOCK PROJECTS
// ============================================================================

export const mockProjects: Project[] = [
  {
    _id: 'project-1',
    _type: 'project',
    headline: 'Smart Traffic Management System',
    slug: { current: 'smart-traffic-management' },
    description: [
      {
        _type: 'block',
        _key: 'desc-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-desc-1',
            text: 'Developing an AI-powered traffic management system that uses real-time sensor data to optimize signal timing and reduce congestion.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    theme: 'systems',
    status: 'active',
    team: [{ _ref: 'person-1' }, { _ref: 'person-2' }],
    teamDetails: [mockPeople[0], mockPeople[1]],
    featuredImage: {
      _type: 'image',
      asset: { _ref: 'image-traffic-800x600-jpg' },
      alt: 'Traffic intersection with smart sensors',
    },
    chartData: mockBarChartData,
    relatedPublications: [mockPublications[0]],
    startDate: '2023-01-15',
    endDate: '2025-12-31',
  },
  {
    _id: 'project-2',
    _type: 'project',
    headline: 'Urban Mobility Patterns Study',
    slug: { current: 'urban-mobility-patterns' },
    description: [
      {
        _type: 'block',
        _key: 'desc-2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-desc-2',
            text: 'A comprehensive study of how residents move through the city using anonymized mobile data and surveys.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    theme: 'behavior',
    status: 'active',
    team: [{ _ref: 'person-2' }, { _ref: 'person-4' }],
    teamDetails: [mockPeople[1], mockPeople[3]],
    chartData: mockLineChartData,
    relatedPublications: [mockPublications[1], mockPublications[4]],
    startDate: '2022-06-01',
  },
  {
    _id: 'project-3',
    _type: 'project',
    headline: 'Affordable Housing Policy Framework',
    slug: { current: 'affordable-housing-policy' },
    description: [
      {
        _type: 'block',
        _key: 'desc-3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-desc-3',
            text: 'Developing evidence-based policy recommendations for improving housing affordability in metropolitan areas.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    theme: 'policy',
    status: 'completed',
    team: [{ _ref: 'person-1' }, { _ref: 'person-4' }],
    teamDetails: [mockPeople[0], mockPeople[3]],
    featuredImage: {
      _type: 'image',
      asset: { _ref: 'image-housing-800x600-jpg' },
      alt: 'Urban housing development',
    },
    chartData: mockPieChartData,
    relatedPublications: [mockPublications[2]],
    startDate: '2021-03-01',
    endDate: '2023-12-15',
  },
  {
    _id: 'project-4',
    _type: 'project',
    headline: 'Climate Resilient Infrastructure Initiative',
    slug: { current: 'climate-resilient-infrastructure' },
    description: [
      {
        _type: 'block',
        _key: 'desc-4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-desc-4',
            text: 'Planning phase for a multi-year initiative to develop guidelines for climate-resilient urban infrastructure.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    theme: 'systems',
    status: 'planned',
    team: [{ _ref: 'person-1' }, { _ref: 'person-5' }],
    teamDetails: [mockPeople[0], mockPeople[4]],
    chartData: mockAreaChartData,
    relatedPublications: [mockPublications[3]],
    startDate: '2025-01-01',
  },
]

// ============================================================================
// FACTORY FUNCTIONS (for generating custom test data)
// ============================================================================

/**
 * Creates a mock Person with optional overrides
 */
export function createMockPerson(overrides: Partial<Person> = {}): Person {
  const id = overrides._id || `person-${Date.now()}`
  const name = overrides.name || 'Test Person'
  return {
    _id: id,
    _type: 'person',
    name,
    slug: { current: name.toLowerCase().replace(/\s+/g, '-') },
    role: 'staff',
    ...overrides,
  }
}

/**
 * Creates a mock Publication with optional overrides
 */
export function createMockPublication(overrides: Partial<Publication> = {}): Publication {
  const id = overrides._id || `pub-${Date.now()}`
  const title = overrides.title || 'Test Publication'
  return {
    _id: id,
    _type: 'publication',
    title,
    slug: { current: title.toLowerCase().replace(/\s+/g, '-') },
    authors: [{ _ref: 'person-1' }],
    publishedAt: '2024-01-01',
    documentType: 'journal',
    ...overrides,
  }
}

/**
 * Creates a mock Project with optional overrides
 */
export function createMockProject(overrides: Partial<Project> = {}): Project {
  const id = overrides._id || `project-${Date.now()}`
  const headline = overrides.headline || 'Test Project'
  return {
    _id: id,
    _type: 'project',
    headline,
    slug: { current: headline.toLowerCase().replace(/\s+/g, '-') },
    theme: 'systems',
    status: 'active',
    team: [{ _ref: 'person-1' }],
    ...overrides,
  }
}

/**
 * Creates mock ChartData with optional overrides
 */
export function createMockChartData(overrides: Partial<ChartData> = {}): ChartData {
  return {
    chartType: 'bar',
    title: 'Test Chart',
    data: [
      { label: 'A', value: 10 },
      { label: 'B', value: 20 },
      { label: 'C', value: 30 },
    ],
    ...overrides,
  }
}

// ============================================================================
// EDGE CASE MOCKS (for testing validation and error handling)
// ============================================================================

/**
 * Person with minimal required fields only
 */
export const mockMinimalPerson: Person = {
  _id: 'person-minimal',
  _type: 'person',
  name: 'Minimal Person',
  slug: { current: 'minimal-person' },
  role: 'student',
}

/**
 * Publication with minimal required fields only
 */
export const mockMinimalPublication: Publication = {
  _id: 'pub-minimal',
  _type: 'publication',
  title: 'Minimal Publication',
  slug: { current: 'minimal-publication' },
  authors: [{ _ref: 'person-1' }],
  publishedAt: '2024-01-01',
  documentType: 'journal',
}

/**
 * Project with minimal required fields only
 */
export const mockMinimalProject: Project = {
  _id: 'project-minimal',
  _type: 'project',
  headline: 'Minimal Project',
  slug: { current: 'minimal-project' },
  theme: 'systems',
  status: 'planned',
  team: [],
}

/**
 * Empty chart data (for edge case testing)
 */
export const mockEmptyChartData: ChartData = {
  chartType: 'bar',
  data: [],
}

/**
 * Chart data with null-like values (for edge case testing)
 */
export const mockChartDataWithZeros: ChartData = {
  chartType: 'line',
  title: 'Chart with Zero Values',
  data: [
    { label: 'Zero', value: 0 },
    { label: 'Positive', value: 100 },
    { label: 'Another Zero', value: 0 },
  ],
}
