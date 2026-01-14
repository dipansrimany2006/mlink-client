'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { WalletButton } from '@/components/WalletButton';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'API Keys' },
  { href: '/dashboard/mlinks', label: 'My MLinks' },
  { href: '/docs', label: 'Docs' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#CCF1E7]">
      {/* Header */}
      <header className="border-b border-black/10 sticky top-0 z-50 bg-[#CCF1E7]/95 backdrop-blur supports-[backdrop-filter]:bg-[#CCF1E7]/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/mlinks-logo.png"
                alt="MLink Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <nav className="hidden md:flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-black/10 text-black'
                      : 'text-black/60 hover:text-black hover:bg-black/5'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <WalletButton />
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-b border-black/10 px-6 py-2 flex gap-1 overflow-x-auto bg-[#CCF1E7]">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap',
              pathname === item.href
                ? 'bg-black/10 text-black'
                : 'text-black/60 hover:text-black hover:bg-black/5'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        {children}
      </main>
    </div>
  );
}
