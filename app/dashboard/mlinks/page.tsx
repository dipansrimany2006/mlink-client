'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Copy, Check, Trash2, Plus, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface MLink {
  mlinkId: string;
  actionUrl: string;
  name: string;
  description: string;
  icon: string;
  status: 'pending' | 'approved' | 'blocked';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function MLinksPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [mlinks, setMLinks] = useState<MLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  useEffect(() => {
    if (address) {
      fetchMLinks();
    } else {
      setIsLoading(false);
    }
  }, [address]);

  const fetchMLinks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/registry/my-mlinks?address=${address}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      setMLinks(data.mlinks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch MLinks');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMLink = async (mlinkId: string, apiKey: string) => {
    if (!confirm('Are you sure you want to delete this MLink? This cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/registry/${mlinkId}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': apiKey,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || 'Failed to delete MLink');
      }

      setMLinks(mlinks.filter((m) => m.mlinkId !== mlinkId));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete MLink');
    }
  };

  const copyToClipboard = (mlinkId: string, actionUrl: string) => {
    const blinkUrl = `${window.location.origin}/mlink?action=${encodeURIComponent(actionUrl)}`;
    navigator.clipboard.writeText(blinkUrl);
    setCopiedId(mlinkId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'destructive' => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'blocked':
        return 'destructive';
      default:
        return 'warning';
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-destructive mb-2">Error</h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button variant="outline" onClick={fetchMLinks}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">My MLinks</h1>
          <p className="text-black/60">Manage your registered MLinks</p>
        </div>
        <Button asChild className="bg-black text-white hover:bg-black/80">
          <Link href="/dashboard/register">
            <Plus className="h-4 w-4 mr-2" />
            Register New MLink
          </Link>
        </Button>
      </div>

      {mlinks.length === 0 ? (
        <Card className="bg-white/50 border-black/10">
          <CardContent className="py-12 text-center">
            <p className="text-black/60 mb-4">No MLinks registered yet.</p>
            <Button asChild variant="link" className="text-[#00D395]">
              <Link href="/dashboard/register">
                Register your first MLink
                <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {mlinks.map((mlink) => (
            <Card key={mlink.mlinkId} className="overflow-hidden bg-white/50 border-black/10">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-black/5 flex-shrink-0">
                    <Image
                      src={mlink.icon}
                      alt={mlink.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate text-black">{mlink.name}</h3>
                      <Badge variant={getStatusVariant(mlink.status)}>
                        {mlink.status}
                      </Badge>
                    </div>
                    <p className="text-black/60 text-sm truncate mb-2">{mlink.description}</p>
                    <p className="text-xs text-black/50 truncate">{mlink.actionUrl}</p>
                    {mlink.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {mlink.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-black/10 text-black/70">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(mlink.mlinkId, mlink.actionUrl)}
                      className="bg-black/10 text-black hover:bg-black/20"
                    >
                      {copiedId === mlink.mlinkId ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy URL
                        </>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const apiKey = prompt('Enter your API key to delete this MLink:');
                        if (apiKey) {
                          deleteMLink(mlink.mlinkId, apiKey);
                        }
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Info Section */}
      <Card className="mt-8 bg-white/50 border-black/10">
        <CardHeader>
          <CardTitle className="text-lg text-black">Status Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Badge variant="warning">pending</Badge>
              <span className="text-black/60">Your MLink is awaiting review</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="success">approved</Badge>
              <span className="text-black/60">Your MLink is live and visible in the public registry</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="destructive">blocked</Badge>
              <span className="text-black/60">Your MLink has been blocked for policy violations</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
