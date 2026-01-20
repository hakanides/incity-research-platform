import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/Badge'

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Status</Badge>)
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Badge data-testid="badge">Default</Badge>)
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('bg-gray-100')
    expect(badge).toHaveClass('text-gray-800')
  })

  it('applies primary variant styles', () => {
    render(<Badge variant="primary" data-testid="badge">Primary</Badge>)
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('bg-primary-100')
    expect(badge).toHaveClass('text-primary-800')
  })

  it('applies success variant styles', () => {
    render(<Badge variant="success" data-testid="badge">Success</Badge>)
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('bg-green-100')
    expect(badge).toHaveClass('text-green-800')
  })

  it('applies warning variant styles', () => {
    render(<Badge variant="warning" data-testid="badge">Warning</Badge>)
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('bg-yellow-100')
    expect(badge).toHaveClass('text-yellow-800')
  })

  it('applies error variant styles', () => {
    render(<Badge variant="error" data-testid="badge">Error</Badge>)
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('bg-red-100')
    expect(badge).toHaveClass('text-red-800')
  })

  it('applies small size styles', () => {
    render(<Badge size="sm" data-testid="badge">Small</Badge>)
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('px-2')
    expect(badge).toHaveClass('py-0.5')
    expect(badge).toHaveClass('text-xs')
  })

  it('applies medium size styles by default', () => {
    render(<Badge data-testid="badge">Medium</Badge>)
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('px-2.5')
    expect(badge).toHaveClass('py-1')
    expect(badge).toHaveClass('text-sm')
  })

  it('applies base styles', () => {
    render(<Badge data-testid="badge">Base</Badge>)
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('inline-flex')
    expect(badge).toHaveClass('items-center')
    expect(badge).toHaveClass('font-medium')
    expect(badge).toHaveClass('rounded-full')
  })

  it('merges custom className', () => {
    render(<Badge className="custom-badge" data-testid="badge">Custom</Badge>)
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('custom-badge')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Badge ref={ref}>Ref Badge</Badge>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it('passes through additional props', () => {
    render(<Badge data-testid="test-badge" id="badge-1">Props</Badge>)
    const badge = screen.getByTestId('test-badge')
    expect(badge).toHaveAttribute('id', 'badge-1')
  })
})
