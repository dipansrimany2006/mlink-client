'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';
import { WalletButton } from '@/components/WalletButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Shield } from 'lucide-react';

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
  const { address, isConnected } = useAccount();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      if (!isConnected || !address) {
        setIsAdmin(false);
        return;
      }

      try {
        const response = await fetch('/api/admin/check', {
          headers: {
            'x-admin-address': address,
          },
        });
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch {
        setIsAdmin(false);
      }
    }

    checkAdmin();
  }, [address, isConnected]);

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
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link href="/admin">
                <Button variant="mantle-outline" size="sm">
                  <Shield className="w-4 h-4" />
                  Admin Control
                </Button>
              </Link>
            )}
            <WalletButton />
          </div>
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
        {isAdmin && (
          <Link
            href="/admin"
            className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap bg-[#00D395]/20 text-[#00D395] flex items-center gap-1"
          >
            <Shield className="w-3 h-3" />
            Admin
          </Link>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        {children}
      </main>
    </div>
  );
}
