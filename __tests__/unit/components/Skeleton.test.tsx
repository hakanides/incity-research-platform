import { render, screen } from '@testing-library/react'
import {
  Skeleton,
  SkeletonCard,
  SkeletonPersonCard,
  SkeletonPublicationCard,
  SkeletonProjectCard,
} from '@/components/ui/Skeleton'

describe('Skeleton', () => {
  it('renders with default styles', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstChild
    expect(skeleton).toHaveClass('animate-pulse')
    expect(skeleton).toHaveClass('rounded-md')
    expect(skeleton).toHaveClass('bg-gray-200')
  })

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="h-10 w-20" />)
    const skeleton = container.firstChild
    expect(skeleton).toHaveClass('h-10')
    expect(skeleton).toHaveClass('w-20')
  })
})

describe('SkeletonCard', () => {
  it('renders card skeleton structure', () => {
    const { container } = render(<SkeletonCard />)
    expect(container.firstChild).toHaveClass('rounded-lg')
    expect(container.firstChild).toHaveClass('border')
    expect(container.firstChild).toHaveClass('bg-white')
  })

  it('contains skeleton elements', () => {
    const { container } = render(<SkeletonCard />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('applies custom className', () => {
    const { container } = render(<SkeletonCard className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})

describe('SkeletonPersonCard', () => {
  it('renders person card skeleton structure', () => {
    const { container } = render(<SkeletonPersonCard />)
    expect(container.firstChild).toHaveClass('rounded-lg')
    expect(container.firstChild).toHaveClass('flex')
    expect(container.firstChild).toHaveClass('items-center')
  })

  it('contains circular skeleton for avatar', () => {
    const { container } = render(<SkeletonPersonCard />)
    const avatar = container.querySelector('.rounded-full')
    expect(avatar).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<SkeletonPersonCard className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})

describe('SkeletonPublicationCard', () => {
  it('renders publication card skeleton structure', () => {
    const { container } = render(<SkeletonPublicationCard />)
    expect(container.firstChild).toHaveClass('rounded-lg')
    expect(container.firstChild).toHaveClass('border')
  })

  it('contains multiple skeleton elements', () => {
    const { container } = render(<SkeletonPublicationCard />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThanOrEqual(4)
  })

  it('applies custom className', () => {
    const { container } = render(<SkeletonPublicationCard className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})

describe('SkeletonProjectCard', () => {
  it('renders project card skeleton structure', () => {
    const { container } = render(<SkeletonProjectCard />)
    expect(container.firstChild).toHaveClass('rounded-lg')
    expect(container.firstChild).toHaveClass('overflow-hidden')
  })

  it('contains image placeholder skeleton', () => {
    const { container } = render(<SkeletonProjectCard />)
    const imagePlaceholder = container.querySelector('.h-40.w-full')
    expect(imagePlaceholder).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<SkeletonProjectCard className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
