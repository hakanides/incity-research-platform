import { render, screen } from '@testing-library/react'
import { ProjectCard } from '@/components/content/ProjectCard'
import { mockProjects, mockMinimalProject } from '@/__tests__/mocks/mockData'

// Mock urlFor function
jest.mock('@/lib/sanity', () => ({
  urlFor: jest.fn(() => ({
    width: jest.fn(() => ({
      height: jest.fn(() => ({
        url: jest.fn(() => 'https://example.com/image.jpg'),
      })),
    })),
  })),
}))

describe('ProjectCard', () => {
  const testProject = mockProjects[0] // Smart Traffic Management System

  it('renders project headline', () => {
    render(<ProjectCard project={testProject} />)
    expect(screen.getByText('Smart Traffic Management System')).toBeInTheDocument()
  })

  it('renders status badge by default', () => {
    render(<ProjectCard project={testProject} />)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('hides status badge when showStatus is false', () => {
    render(<ProjectCard project={testProject} showStatus={false} />)
    expect(screen.queryByText('Active')).not.toBeInTheDocument()
  })

  it('renders theme badge by default', () => {
    render(<ProjectCard project={testProject} />)
    expect(screen.getByText('Urban Systems')).toBeInTheDocument()
  })

  it('hides theme badge when showTheme is false', () => {
    render(<ProjectCard project={testProject} showTheme={false} />)
    expect(screen.queryByText('Urban Systems')).not.toBeInTheDocument()
  })

  it('renders date range when showDates is true', () => {
    render(<ProjectCard project={testProject} showDates={true} />)
    expect(screen.getByText('Jan 2023 - Dec 2025')).toBeInTheDocument()
  })

  it('hides date range when showDates is false', () => {
    render(<ProjectCard project={testProject} showDates={false} />)
    expect(screen.queryByText(/2023/)).not.toBeInTheDocument()
  })

  it('shows "Present" when no end date', () => {
    const projectWithoutEndDate = mockProjects[1] // Urban Mobility Patterns (no endDate)
    render(<ProjectCard project={projectWithoutEndDate} />)
    expect(screen.getByText('Jun 2022 - Present')).toBeInTheDocument()
  })

  it('renders as a link', () => {
    render(<ProjectCard project={testProject} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/projects/smart-traffic-management')
  })

  it('renders different status types correctly', () => {
    const { rerender } = render(<ProjectCard project={mockProjects[0]} />) // active
    expect(screen.getByText('Active')).toBeInTheDocument()

    rerender(<ProjectCard project={mockProjects[2]} />) // completed
    expect(screen.getByText('Completed')).toBeInTheDocument()

    rerender(<ProjectCard project={mockProjects[3]} />) // planned
    expect(screen.getByText('Planned')).toBeInTheDocument()
  })

  it('renders different theme types correctly', () => {
    const { rerender } = render(<ProjectCard project={mockProjects[0]} />) // systems
    expect(screen.getByText('Urban Systems')).toBeInTheDocument()

    rerender(<ProjectCard project={mockProjects[1]} />) // behavior
    expect(screen.getByText('Human Behavior')).toBeInTheDocument()

    rerender(<ProjectCard project={mockProjects[2]} />) // policy
    expect(screen.getByText('Policy & Planning')).toBeInTheDocument()
  })

  it('handles project without featured image', () => {
    render(<ProjectCard project={mockMinimalProject} />)
    expect(screen.getByText('Minimal Project')).toBeInTheDocument()
    // Image container should not exist
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('handles project without dates', () => {
    const projectWithoutDates = { ...mockMinimalProject, startDate: undefined }
    render(<ProjectCard project={projectWithoutDates} />)
    expect(screen.getByText('Minimal Project')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ProjectCard project={testProject} className="custom-class" />
    )
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('has hover styles', () => {
    const { container } = render(<ProjectCard project={testProject} />)
    const card = container.querySelector('.hover\\:shadow-md')
    expect(card).toBeInTheDocument()
  })
})
