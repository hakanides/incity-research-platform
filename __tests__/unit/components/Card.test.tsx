import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Card data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('border')
    expect(card).toHaveClass('border-gray-200')
  })

  it('applies bordered variant styles', () => {
    render(<Card variant="bordered" data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('border-2')
    expect(card).toHaveClass('border-gray-300')
  })

  it('applies elevated variant styles', () => {
    render(<Card variant="elevated" data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('shadow-lg')
  })

  it('applies base styles', () => {
    render(<Card data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('rounded-lg')
    expect(card).toHaveClass('bg-white')
  })

  it('merges custom className', () => {
    render(<Card className="custom-class" data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Card ref={ref}>Ref Card</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(<CardHeader>Header content</CardHeader>)
    expect(screen.getByText('Header content')).toBeInTheDocument()
  })

  it('applies correct styles', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>)
    const header = screen.getByTestId('header')
    expect(header).toHaveClass('px-6')
    expect(header).toHaveClass('py-4')
    expect(header).toHaveClass('border-b')
  })

  it('merges custom className', () => {
    render(<CardHeader className="custom-header" data-testid="header">Header</CardHeader>)
    const header = screen.getByTestId('header')
    expect(header).toHaveClass('custom-header')
  })
})

describe('CardContent', () => {
  it('renders children correctly', () => {
    render(<CardContent>Content body</CardContent>)
    expect(screen.getByText('Content body')).toBeInTheDocument()
  })

  it('applies correct styles', () => {
    render(<CardContent data-testid="content">Content</CardContent>)
    const content = screen.getByTestId('content')
    expect(content).toHaveClass('px-6')
    expect(content).toHaveClass('py-4')
  })

  it('merges custom className', () => {
    render(<CardContent className="custom-content" data-testid="content">Content</CardContent>)
    const content = screen.getByTestId('content')
    expect(content).toHaveClass('custom-content')
  })
})

describe('CardFooter', () => {
  it('renders children correctly', () => {
    render(<CardFooter>Footer content</CardFooter>)
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('applies correct styles', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>)
    const footer = screen.getByTestId('footer')
    expect(footer).toHaveClass('px-6')
    expect(footer).toHaveClass('py-4')
    expect(footer).toHaveClass('border-t')
  })

  it('merges custom className', () => {
    render(<CardFooter className="custom-footer" data-testid="footer">Footer</CardFooter>)
    const footer = screen.getByTestId('footer')
    expect(footer).toHaveClass('custom-footer')
  })
})

describe('Card composition', () => {
  it('renders full card with all sections', () => {
    render(
      <Card data-testid="card">
        <CardHeader data-testid="header">Title</CardHeader>
        <CardContent data-testid="content">Body</CardContent>
        <CardFooter data-testid="footer">Actions</CardFooter>
      </Card>
    )

    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })
})
