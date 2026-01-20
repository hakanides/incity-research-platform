import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/layout/Footer'

describe('Footer', () => {
  it('renders the platform name', () => {
    render(<Footer />)
    expect(screen.getByText('InCity Research Platform')).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<Footer />)
    expect(
      screen.getByText('Advancing urban studies through collaborative research')
    ).toBeInTheDocument()
  })

  it('renders default footer links', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument()
  })

  it('renders custom footer links', () => {
    const customLinks = [
      { label: 'Custom Link', href: '/custom' },
      { label: 'Another Link', href: '/another' },
    ]

    render(<Footer links={customLinks} />)

    expect(screen.getByRole('link', { name: 'Custom Link' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Another Link' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'About' })).not.toBeInTheDocument()
  })

  it('renders copyright with current year', () => {
    const currentYear = new Date().getFullYear()
    render(<Footer />)

    expect(
      screen.getByText(`© ${currentYear} InCity Research. All rights reserved.`)
    ).toBeInTheDocument()
  })

  it('has footer navigation with correct aria-label', () => {
    render(<Footer />)
    expect(screen.getByRole('navigation', { name: 'Footer navigation' })).toBeInTheDocument()
  })

  it('renders as a footer element', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Footer className="custom-footer" />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('custom-footer')
  })

  it('renders links with correct href', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
  })
})
