'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import Image from 'next/image';
import { WalletButton } from '@/components/WalletButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Search, Check, X, ExternalLink, RefreshCw, Shield } from 'lucide-react';

interface MLink {
  mlinkId: string;
  actionUrl: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  status: 'pending' | 'approved' | 'blocked';
  ownerAddress: string;
  createdAt: string;
  updatedAt: string;
}

interface Counts {
  all: number;
  pending: number;
  approved: number;
  blocked: number;
}

type StatusFilter = 'all' | 'pending' | 'approved' | 'blocked';

export default function AdminPage() {
  const { address, isConnected } = useAccount();
  const [mlinks, setMlinks] = useState<MLink[]>([]);
  const [counts, setCounts] = useState<Counts>({ all: 0, pending: 0, approved: 0, blocked: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('pending');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Dialog state
  const [selectedMlink, setSelectedMlink] = useState<MLink | null>(null);
  const [dialogAction, setDialogAction] = useState<'approve' | 'block' | null>(null);
  const [reason, setReason] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchMlinks = useCallback(async () => {
    if (!address) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        status: statusFilter,
        page: page.toString(),
        limit: '20',
      });

      if (search) {
        params.set('search', search);
      }

      const response = await fetch(`/api/admin/mlinks?${params}`, {
        headers: {
          'x-admin-address': address,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch mlinks');
      }

      setMlinks(data.mlinks);
      setCounts(data.counts);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [address, statusFilter, page, search]);

  useEffect(() => {
    if (isConnected && address) {
      fetchMlinks();
    }
  }, [isConnected, address, fetchMlinks]);

  const handleStatusUpdate = async (action: 'approve' | 'block') => {
    if (!selectedMlink || !address) return;

    setUpdating(true);

    // Convert action to status value expected by API
    const status = action === 'approve' ? 'approved' : 'blocked';

    try {
      const response = await fetch(`/api/admin/mlinks/${selectedMlink.mlinkId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-address': address,
        },
        body: JSON.stringify({
          status,
          reason: reason || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to update status');
      }

      // Close dialog and refresh
      setSelectedMlink(null);
      setDialogAction(null);
      setReason('');
      fetchMlinks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const openActionDialog = (mlink: MLink, action: 'approve' | 'block') => {
    setSelectedMlink(mlink);
    setDialogAction(action);
    setReason('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'blocked':
        return <Badge variant="destructive">Blocked</Badge>;
      default:
        return <Badge variant="warning">Pending</Badge>;
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#CCF1E7]">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white/50 rounded-2xl border border-black/10 p-12 text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-black/30" />
            <h1 className="text-2xl font-bold text-black mb-2">Admin Access Required</h1>
            <p className="text-black/60 mb-6">
              Connect your admin wallet to access the MLink management dashboard.
            </p>
            <WalletButton />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#CCF1E7]">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">MLink Management</h1>
          <p className="text-black/60">Review and manage registered MLinks</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            label="Total"
            count={counts.all}
            active={statusFilter === 'all'}
            onClick={() => { setStatusFilter('all'); setPage(1); }}
          />
          <StatsCard
            label="Pending"
            count={counts.pending}
            active={statusFilter === 'pending'}
            onClick={() => { setStatusFilter('pending'); setPage(1); }}
            color="yellow"
          />
          <StatsCard
            label="Approved"
            count={counts.approved}
            active={statusFilter === 'approved'}
            onClick={() => { setStatusFilter('approved'); setPage(1); }}
            color="green"
          />
          <StatsCard
            label="Blocked"
            count={counts.blocked}
            active={statusFilter === 'blocked'}
            onClick={() => { setStatusFilter('blocked'); setPage(1); }}
            color="red"
          />
        </div>

        {/* Search and Refresh */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
            <Input
              placeholder="Search by name, description, URL, or owner..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-10 bg-white/50"
            />
          </div>
          <Button variant="outline" onClick={fetchMlinks} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* MLinks List */}
        <div className="bg-white/50 rounded-2xl border border-black/10 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-black/30" />
              <p className="text-black/60">Loading mlinks...</p>
            </div>
          ) : mlinks.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-black/60">No mlinks found</p>
            </div>
          ) : (
            <div className="divide-y divide-black/10">
              {mlinks.map((mlink) => (
                <div key={mlink.mlinkId} className="p-6 hover:bg-white/30 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white border border-black/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {mlink.icon ? (
                        <Image
                          src={mlink.icon}
                          alt={mlink.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl">🔗</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-black truncate">{mlink.name}</h3>
                        {getStatusBadge(mlink.status)}
                      </div>
                      <p className="text-sm text-black/60 line-clamp-2 mb-2">
                        {mlink.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-black/50">
                        <span>Owner: {formatAddress(mlink.ownerAddress)}</span>
                        <span>Created: {formatDate(mlink.createdAt)}</span>
                        <a
                          href={mlink.actionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:text-[#00D395]"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Action URL
                        </a>
                      </div>

                      {/* Tags */}
                      {mlink.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {mlink.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-black/5 rounded text-xs text-black/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      {mlink.status !== 'approved' && (
                        <Button
                          size="sm"
                          variant="mantle"
                          onClick={() => openActionDialog(mlink, 'approve')}
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </Button>
                      )}
                      {mlink.status !== 'blocked' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openActionDialog(mlink, 'block')}
                        >
                          <X className="w-4 h-4" />
                          Block
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="flex items-center px-4 text-sm text-black/60">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </main>

      {/* Action Dialog */}
      <Dialog
        open={!!dialogAction}
        onOpenChange={() => {
          setDialogAction(null);
          setSelectedMlink(null);
          setReason('');
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogAction === 'approve' ? 'Approve MLink' : 'Block MLink'}
            </DialogTitle>
            <DialogDescription>
              {dialogAction === 'approve'
                ? 'This will allow the MLink to be rendered in applications.'
                : 'This will prevent the MLink from being rendered anywhere.'}
            </DialogDescription>
          </DialogHeader>

          {selectedMlink && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-3 bg-black/5 rounded-lg mb-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-black/10 flex items-center justify-center overflow-hidden">
                  {selectedMlink.icon ? (
                    <Image
                      src={selectedMlink.icon}
                      alt={selectedMlink.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl">🔗</span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-black">{selectedMlink.name}</p>
                  <p className="text-xs text-black/50">{selectedMlink.mlinkId}</p>
                </div>
              </div>

              <label className="block text-sm font-medium text-black mb-2">
                Reason (optional)
              </label>
              <Textarea
                placeholder={
                  dialogAction === 'approve'
                    ? 'Add an optional note...'
                    : 'Explain why this MLink is being blocked...'
                }
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="bg-white/50"
              />
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogAction(null);
                setSelectedMlink(null);
                setReason('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant={dialogAction === 'approve' ? 'mantle' : 'destructive'}
              onClick={() => handleStatusUpdate(dialogAction!)}
              disabled={updating}
            >
              {updating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : dialogAction === 'approve' ? (
                <Check className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
              {dialogAction === 'approve' ? 'Approve' : 'Block'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-black/10 sticky top-0 z-50 bg-[#CCF1E7]/95 backdrop-blur supports-[backdrop-filter]:bg-[#CCF1E7]/60">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/mlinks-logo.png"
            alt="MLinks Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <WalletButton />
        </div>
      </div>
    </header>
  );
}

function StatsCard({
  label,
  count,
  active,
  onClick,
  color,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  color?: 'yellow' | 'green' | 'red';
}) {
  const colorClasses = {
    yellow: 'text-yellow-600',
    green: 'text-[#00D395]',
    red: 'text-red-500',
  };

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all text-left ${
        active
          ? 'bg-white border-[#00D395] shadow-md'
          : 'bg-white/50 border-black/10 hover:bg-white/70'
      }`}
    >
      <p className="text-sm text-black/60 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color ? colorClasses[color] : 'text-black'}`}>
        {count}
      </p>
    </button>
  );
}
