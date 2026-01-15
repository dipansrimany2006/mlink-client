'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ChevronRight, Book, Code, Server, Rocket, Package, Settings, Zap } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

const sidebarNavItems = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs', icon: Book },
      { title: 'Installation', href: '/docs/getting-started', icon: Package },
      { title: 'Quick Start', href: '/docs/quick-start', icon: Rocket },
    ],
  },
  {
    title: 'Client',
    items: [
      { title: 'Overview', href: '/docs/client', icon: Code },
      { title: 'Mlink Component', href: '/docs/client/mlink-component', icon: Zap },
      { title: 'useMlink Hook', href: '/docs/client/use-mlink', icon: Code },
      { title: 'useExecuteMlink', href: '/docs/client/use-execute-mlink', icon: Code },
      { title: 'Adapters', href: '/docs/client/adapters', icon: Settings },
      { title: 'Theming', href: '/docs/client/theming', icon: Settings },
    ],
  },
  {
    title: 'Actions (Server)',
    items: [
      { title: 'Overview', href: '/docs/actions', icon: Server },
      { title: 'Creating Actions', href: '/docs/actions/creating-actions', icon: Code },
      { title: 'Next.js Adapter', href: '/docs/actions/nextjs-adapter', icon: Server },
      { title: 'Parameters', href: '/docs/actions/parameters', icon: Settings },
      { title: 'Transactions', href: '/docs/actions/transactions', icon: Zap },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Types', href: '/docs/api/types', icon: Code },
      { title: 'Utilities', href: '/docs/api/utilities', icon: Settings },
      { title: 'Constants', href: '/docs/api/constants', icon: Book },
    ],
  },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-zinc-950 dark">
      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 z-30 h-screen w-64 border-r border-zinc-800 bg-zinc-900">
        <div className="flex h-16 items-center border-b border-zinc-800 px-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/mlinks-logo.png" alt="Mlinks" className="h-10 w-auto" />
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
          <div className="px-4 py-6">
            {sidebarNavItems.map((section, index) => (
              <div key={index} className="mb-6">
                <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {section.title}
                </h4>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                          isActive
                            ? 'bg-[#64B3AE]/10 font-medium text-[#64B3AE]'
                            : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-64 bg-zinc-950 text-zinc-100">
        <div className="mx-auto max-w-4xl px-8 py-12">
          {children}
        </div>
      </main>
    </div>
  )
}
