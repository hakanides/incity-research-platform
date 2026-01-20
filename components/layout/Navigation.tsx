'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export interface NavItem {
  label: string
  href: string
}

export interface NavigationProps {
  items?: NavItem[]
  className?: string
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Publications', href: '/publications' },
  { label: 'People', href: '/people' },
]

export function Navigation({ items = defaultNavItems, className }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center gap-6', className)} aria-label="Main navigation">
      <ul className="flex items-center gap-6" role="list">
        {items.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href))

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-600',
                  isActive
                    ? 'text-primary-600'
                    : 'text-gray-600'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
