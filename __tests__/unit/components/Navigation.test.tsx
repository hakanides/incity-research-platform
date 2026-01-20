import { render, screen } from '@testing-library/react'
import { Navigation } from '@/components/layout/Navigation'

// Mock next/navigation
const mockPathname = jest.fn()
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}))

describe('Navigation', () => {
  beforeEach(() => {
    mockPathname.mockReturnValue('/')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders default navigation items', () => {
    render(<Navigation />)

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Publications' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'People' })).toBeInTheDocument()
  })

  it('renders custom navigation items', () => {
    const customItems = [
      { label: 'Custom 1', href: '/custom-1' },
      { label: 'Custom 2', href: '/custom-2' },
    ]

    render(<Navigation items={customItems} />)

    expect(screen.getByRole('link', { name: 'Custom 1' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Custom 2' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument()
  })

  it('has correct aria-label', () => {
    render(<Navigation />)
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
  })

  it('marks active link with aria-current', () => {
    mockPathname.mockReturnValue('/projects')
    render(<Navigation />)

    const projectsLink = screen.getByRole('link', { name: 'Projects' })
    expect(projectsLink).toHaveAttribute('aria-current', 'page')
  })

  it('applies active styles to current page link', () => {
    mockPathname.mockReturnValue('/')
    render(<Navigation />)

    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveClass('text-primary-600')
  })

  it('applies inactive styles to non-current links', () => {
    mockPathname.mockReturnValue('/')
    render(<Navigation />)

    const projectsLink = screen.getByRole('link', { name: 'Projects' })
    expect(projectsLink).toHaveClass('text-gray-600')
  })

  it('handles nested routes correctly', () => {
    mockPathname.mockReturnValue('/projects/some-project')
    render(<Navigation />)

    const projectsLink = screen.getByRole('link', { name: 'Projects' })
    expect(projectsLink).toHaveAttribute('aria-current', 'page')
  })

  it('applies custom className', () => {
    render(<Navigation className="custom-nav" />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('custom-nav')
  })

  it('renders links with correct href', () => {
    render(<Navigation />)

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects')
  })
})
