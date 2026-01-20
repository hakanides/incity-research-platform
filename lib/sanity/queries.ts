// GROQ queries for Sanity data fetching

export const personQuery = `*[_type == "person" && slug.current == $slug][0]{
  _id,
  _type,
  name,
  slug,
  role,
  photo,
  bio,
  email,
  linkedIn
}`

export const allPeopleQuery = `*[_type == "person"] | order(name asc){
  _id,
  _type,
  name,
  slug,
  role,
  photo
}`

export const publicationQuery = `*[_type == "publication" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  slug,
  authors[]->{_id, name, slug},
  publishedAt,
  abstract,
  documentType,
  file,
  externalUrl,
  tags
}`

export const allPublicationsQuery = `*[_type == "publication"] | order(publishedAt desc){
  _id,
  _type,
  title,
  slug,
  authors[]->{_id, name, slug},
  publishedAt,
  documentType,
  tags
}`

export const projectQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  _type,
  headline,
  slug,
  description,
  theme,
  status,
  team[]->{_id, name, slug},
  featuredImage,
  chartData,
  startDate,
  endDate
}`

export const allProjectsQuery = `*[_type == "project"] | order(startDate desc){
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
