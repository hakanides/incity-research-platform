'use client'

import Link from 'next/link'
import { Navigation, type NavItem } from './Navigation'
import { cn } from '@/lib/utils'

export interface HeaderProps {
  navItems?: NavItem[]
  className?: string
}

export function Header({ navItems, className }: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60',
        className
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-xl text-gray-900 hover:text-primary-600 transition-colors"
        >
          <span className="sr-only">InCity Research - </span>
          InCity Research
        </Link>

        <Navigation items={navItems} />
      </div>
    </header>
  )
}
