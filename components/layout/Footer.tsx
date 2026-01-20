'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterProps {
  className?: string
  links?: FooterLink[]
}

const defaultLinks: FooterLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
]

export function Footer({ className, links = defaultLinks }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'border-t border-gray-200 bg-gray-50',
        className
      )}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="text-sm font-medium text-gray-900">InCity Research Platform</p>
            <p className="text-sm text-gray-600">
              Advancing urban studies through collaborative research
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6" role="list">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} InCity Research. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
