import { render, screen } from '@testing-library/react'
import { PersonCard } from '@/components/content/PersonCard'
import { mockPeople, mockMinimalPerson } from '@/__tests__/mocks/mockData'

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

describe('PersonCard', () => {
  const testPerson = mockPeople[0] // Dr. Sarah Chen

  it('renders person name', () => {
    render(<PersonCard person={testPerson} />)
    expect(screen.getByText('Dr. Sarah Chen')).toBeInTheDocument()
  })

  it('renders role badge by default', () => {
    render(<PersonCard person={testPerson} />)
    expect(screen.getByText('Director')).toBeInTheDocument()
  })

  it('hides role badge when showRole is false', () => {
    render(<PersonCard person={testPerson} showRole={false} />)
    expect(screen.queryByText('Director')).not.toBeInTheDocument()
  })

  it('renders email when provided', () => {
    render(<PersonCard person={testPerson} />)
    expect(screen.getByText('sarah.chen@incity.edu')).toBeInTheDocument()
  })

  it('does not render email when not provided', () => {
    const personWithoutEmail = { ...mockMinimalPerson, email: undefined }
    render(<PersonCard person={personWithoutEmail} />)
    expect(screen.queryByText(/@/)).not.toBeInTheDocument()
  })

  it('renders as a link by default', () => {
    render(<PersonCard person={testPerson} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/people/sarah-chen')
  })

  it('does not render as link when linkToProfile is false', () => {
    render(<PersonCard person={testPerson} linkToProfile={false} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('shows initials when no photo is provided', () => {
    render(<PersonCard person={mockMinimalPerson} />)
    expect(screen.getByText('M')).toBeInTheDocument() // "Minimal Person" -> "M"
  })

  it('renders different role badges correctly', () => {
    const { rerender } = render(<PersonCard person={mockPeople[1]} />) // faculty
    expect(screen.getByText('Faculty')).toBeInTheDocument()

    rerender(<PersonCard person={mockPeople[2]} />) // staff
    expect(screen.getByText('Staff')).toBeInTheDocument()

    rerender(<PersonCard person={mockPeople[3]} />) // student
    expect(screen.getByText('Student')).toBeInTheDocument()

    rerender(<PersonCard person={mockPeople[4]} />) // alumni
    expect(screen.getByText('Alumni')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <PersonCard person={testPerson} className="custom-class" />
    )
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('has hover styles', () => {
    const { container } = render(<PersonCard person={testPerson} />)
    const card = container.querySelector('.hover\\:shadow-md')
    expect(card).toBeInTheDocument()
  })
})
