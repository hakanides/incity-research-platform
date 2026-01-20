import { render, screen } from '@testing-library/react'
import { Header } from '@/components/layout/Header'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header', () => {
  it('renders the logo/brand name', () => {
    render(<Header />)
    expect(screen.getByText('InCity Research')).toBeInTheDocument()
  })

  it('renders as a header element', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('contains navigation', () => {
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('has a link to home page on logo', () => {
    render(<Header />)
    const homeLinks = screen.getAllByRole('link', { name: /InCity Research/i })
    expect(homeLinks[0]).toHaveAttribute('href', '/')
  })

  it('includes screen reader text', () => {
    render(<Header />)
    expect(screen.getByText('InCity Research -')).toHaveClass('sr-only')
  })

  it('applies sticky positioning styles', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky')
    expect(header).toHaveClass('top-0')
    expect(header).toHaveClass('z-50')
  })

  it('applies custom className', () => {
    render(<Header className="custom-header" />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('custom-header')
  })

  it('renders with custom nav items', () => {
    const customItems = [
      { label: 'Test', href: '/test' },
    ]
    render(<Header navItems={customItems} />)

    expect(screen.getByRole('link', { name: 'Test' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Projects' })).not.toBeInTheDocument()
  })
})
