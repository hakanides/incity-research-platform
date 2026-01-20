import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const isSanityConfigured = Boolean(projectId && projectId !== 'your-project-id' && /^[a-z0-9-]+$/.test(projectId))

// Only create a real client if properly configured
export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
    })
  : createClient({
      projectId: 'dummy-project',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
    })
