# InCity Research Platform

A research-focused web platform for urban studies, featuring CMS-driven content, data visualizations, and a comprehensive publication database.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Sanity](https://img.shields.io/badge/Sanity-CMS-f03e2f?logo=sanity)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local

# 3. Configure your Sanity project at sanity.io/manage
#    Then update .env.local with your project credentials

# 4. Start the development server
npm run dev

# 5. Access the application
#    App:    http://localhost:3000
#    Studio: http://localhost:3000/studio
```

---

## Project Overview

### Purpose
A web platform designed for the InCity research center to showcase urban studies research, manage team profiles, and publish academic work.

### Key Features
- **CMS-Driven Content**: Sanity.io backend for easy content management by non-technical staff
- **Data Visualizations**: Interactive charts (bar, line, pie, area) powered by Recharts
- **Map Integration**: Mapbox GL for geographic data visualization
- **Publication Database**: Filterable research paper repository with author relationships
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Target Users
- Researchers managing their publications and project data
- Non-technical staff entering and updating content through Sanity Studio

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| CMS | Sanity.io |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Maps | Mapbox GL / react-map-gl |
| Testing | Jest, Playwright, Storybook |

---

## Project Structure

```
app/                  # Next.js pages and layouts
  layout.tsx          # Root layout
  page.tsx            # Home page
  globals.css         # Global styles

components/           # Reusable UI components
  charts/             # Recharts visualizations
  maps/               # Mapbox components
  layout/             # Layout components
  ui/                 # Base UI elements

lib/                  # Utilities and configurations
  sanity/             # Sanity client, queries, image helpers
  utils.ts            # Shared utility functions

sanity/               # CMS configuration
  schemas/            # Content type definitions

types/                # TypeScript type definitions
  index.ts            # Shared types for Person, Publication, Project

__tests__/            # Test files
  unit/               # Jest unit tests
  integration/        # Integration tests
  e2e/                # Playwright E2E tests
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Run E2E tests with UI |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build-storybook` | Build static Storybook |

---

## Sanity CMS Schemas

### Person
Team member profiles with role-based categorization.

| Field | Type | Description |
|-------|------|-------------|
| name | string | Full name (required) |
| slug | slug | URL-friendly identifier |
| role | select | director, faculty, staff, student, alumni |
| photo | image | Profile picture with hotspot |
| bio | portable text | Biography content |
| email | string | Contact email (validated) |
| linkedIn | url | LinkedIn profile link |

### Publication
Research papers and academic documents.

| Field | Type | Description |
|-------|------|-------------|
| title | string | Publication title (required) |
| slug | slug | URL-friendly identifier |
| authors | reference[] | Links to Person documents |
| publishedAt | date | Publication date (required) |
| documentType | select | journal, conference, thesis, report, book-chapter |
| abstract | portable text | Paper summary |
| file | file | Uploaded PDF |
| externalUrl | url | DOI or external link |
| tags | string[] | Categorization tags |

### Project
Research projects with embedded visualization data.

| Field | Type | Description |
|-------|------|-------------|
| headline | string | Project title (required) |
| slug | slug | URL-friendly identifier |
| description | portable text | Project overview |
| theme | select | systems, behavior, policy |
| status | select | active, completed, planned |
| team | reference[] | Links to Person documents |
| featuredImage | image | Cover image |
| chartData | object | Embedded chart configuration |
| relatedPublications | reference[] | Links to Publication documents |
| startDate / endDate | date | Project timeline |

---

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id    # From sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET=production            # Usually "production"
SANITY_API_TOKEN=your-api-token                  # For server-side queries

# Mapbox
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your-mapbox-token  # From mapbox.com

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000       # Your deployment URL
```

### Getting Credentials

1. **Sanity**: Create a project at [sanity.io/manage](https://www.sanity.io/manage), then find your Project ID in settings
2. **Mapbox**: Sign up at [mapbox.com](https://www.mapbox.com/) and generate an access token

---

## Development Guidelines

### Test-Driven Development (TDD)
This project follows TDD methodology:
1. Write failing tests first
2. Implement code to pass tests
3. Refactor while maintaining green tests

### Code Quality
- **Coverage threshold**: 70% minimum
- **Linting**: ESLint with Next.js configuration
- **Type safety**: Strict TypeScript throughout

### Running Tests

```bash
# Unit tests
npm test

# Watch mode during development
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e
```

---

## License

MIT
