import { render, screen } from '@testing-library/react'
import { PublicationCard } from '@/components/content/PublicationCard'
import { mockPublications, mockMinimalPublication } from '@/__tests__/mocks/mockData'

describe('PublicationCard', () => {
  const testPublication = mockPublications[0] // Smart City Infrastructure paper

  it('renders publication title', () => {
    render(<PublicationCard publication={testPublication} />)
    expect(
      screen.getByText('Smart City Infrastructure: A Comprehensive Analysis of Urban Sensor Networks')
    ).toBeInTheDocument()
  })

  it('renders document type badge', () => {
    render(<PublicationCard publication={testPublication} />)
    expect(screen.getByText('Journal Article')).toBeInTheDocument()
  })

  it('renders publication year', () => {
    render(<PublicationCard publication={testPublication} />)
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('renders author names when showAuthors is true', () => {
    render(<PublicationCard publication={testPublication} showAuthors={true} />)
    expect(screen.getByText('Dr. Sarah Chen, Prof. Michael Torres')).toBeInTheDocument()
  })

  it('hides author names when showAuthors is false', () => {
    render(<PublicationCard publication={testPublication} showAuthors={false} />)
    expect(screen.queryByText('Dr. Sarah Chen, Prof. Michael Torres')).not.toBeInTheDocument()
  })

  it('renders tags when showTags is true', () => {
    render(<PublicationCard publication={testPublication} showTags={true} />)
    expect(screen.getByText('smart city')).toBeInTheDocument()
    expect(screen.getByText('sensors')).toBeInTheDocument()
  })

  it('hides tags when showTags is false', () => {
    render(<PublicationCard publication={testPublication} showTags={false} />)
    expect(screen.queryByText('smart city')).not.toBeInTheDocument()
  })

  it('shows +N more when there are more than 3 tags', () => {
    render(<PublicationCard publication={testPublication} />)
    // testPublication has 4 tags, so should show "+1 more"
    expect(screen.getByText('+1 more')).toBeInTheDocument()
  })

  it('does not show +N more when 3 or fewer tags', () => {
    const pubWith3Tags = {
      ...testPublication,
      tags: ['tag1', 'tag2', 'tag3'],
    }
    render(<PublicationCard publication={pubWith3Tags} />)
    expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument()
  })

  it('renders as a link', () => {
    render(<PublicationCard publication={testPublication} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/publications/smart-city-infrastructure-analysis')
  })

  it('renders different document types correctly', () => {
    const { rerender } = render(<PublicationCard publication={mockPublications[1]} />) // conference
    expect(screen.getByText('Conference Paper')).toBeInTheDocument()

    rerender(<PublicationCard publication={mockPublications[2]} />) // thesis
    expect(screen.getByText('Thesis')).toBeInTheDocument()

    rerender(<PublicationCard publication={mockPublications[3]} />) // report
    expect(screen.getByText('Report')).toBeInTheDocument()

    rerender(<PublicationCard publication={mockPublications[4]} />) // book-chapter
    expect(screen.getByText('Book Chapter')).toBeInTheDocument()
  })

  it('handles publication without tags', () => {
    render(<PublicationCard publication={mockMinimalPublication} />)
    expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument()
  })

  it('handles publication without authorDetails', () => {
    render(<PublicationCard publication={mockMinimalPublication} />)
    // Should not crash, just not show authors
    expect(screen.getByText('Minimal Publication')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <PublicationCard publication={testPublication} className="custom-class" />
    )
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })
})
