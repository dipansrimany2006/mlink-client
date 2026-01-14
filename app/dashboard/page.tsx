'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Copy, Check, Trash2, Key, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface ApiKey {
  _id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsedAt: string | null;
  isActive: boolean;
}

interface NewKey {
  key: string;
  name: string;
}

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<NewKey | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  useEffect(() => {
    if (address) {
      fetchKeys();
    } else {
      setIsLoading(false);
    }
  }, [address]);

  const fetchKeys = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/keys?address=${address}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      setKeys(data.keys);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch API keys');
    } finally {
      setIsLoading(false);
    }
  };

  const createKey = async () => {
    if (!newKeyName.trim()) return;

    try {
      setIsCreating(true);
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerAddress: address,
          name: newKeyName.trim(),
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      setNewlyCreatedKey({
        key: data.key.key,
        name: data.key.name,
      });
      setNewKeyName('');
      fetchKeys();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create API key');
    } finally {
      setIsCreating(false);
    }
  };

  const deleteKey = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key? This cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/keys/${id}?address=${address}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete API key');
      }

      setKeys(keys.filter((k) => k._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete API key');
    }
  };

  const copyToClipboard = (keyId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(keyId);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const maskKey = (key: string) => {
    return `${key.substring(0, 7)}${'•'.repeat(30)}${key.substring(key.length - 4)}`;
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
        <Skeleton className="h-8 w-48" />
        <Card>
          <CardContent className="pt-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-destructive mb-2">Error</h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button variant="outline" onClick={fetchKeys}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black mb-2">API Keys</h1>
        <p className="text-black/60">
          Generate API keys to authenticate your MLink actions
        </p>
      </div>

      {/* Newly Created Key Modal */}
      {newlyCreatedKey && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-lg w-full bg-white border-black/10">
            <CardHeader>
              <CardTitle className="text-[#00D395] flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Key Created!
              </CardTitle>
              <CardDescription className="text-black/60">
                Your API key has been created. You can view and copy it anytime from your dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-black/60 mb-1 block">Name</label>
                <p className="font-medium text-black">{newlyCreatedKey.name}</p>
              </div>

              <div>
                <label className="text-sm text-black/60 mb-1 block">API Key</label>
                <code className="block bg-black/5 px-3 py-2 rounded-lg text-[#00D395] text-sm break-all font-mono border border-black/10">
                  {newlyCreatedKey.key}
                </code>
              </div>

              <Button
                onClick={() => setNewlyCreatedKey(null)}
                className="w-full bg-black text-white hover:bg-black/80"
              >
                Done
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Create New Key */}
      <Card className="mb-8 border-[#00D395]/30 bg-white/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2 text-black">
            <Plus className="h-5 w-5" />
            Create New API Key
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Key name (e.g., Production, Development)"
              maxLength={50}
              className="flex-1 bg-white border-black/20"
            />
            <Button
              onClick={createKey}
              disabled={isCreating || !newKeyName.trim()}
              className="bg-black text-white hover:bg-black/80"
            >
              {isCreating ? 'Creating...' : 'Generate Key'}
            </Button>
          </div>
          <p className="text-black/60 text-sm">
            Maximum 5 API keys per wallet
          </p>
        </CardContent>
      </Card>

      {/* API Keys List */}
      <Card className="bg-white/50 border-black/10">
        <CardHeader>
          <CardTitle className="text-lg text-black">Your API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          {keys.length === 0 ? (
            <p className="text-black/60 text-center py-8">
              No API keys yet. Create one to get started.
            </p>
          ) : (
            <div className="space-y-4">
              {keys.map((apiKey) => (
                <div
                  key={apiKey._id}
                  className="p-4 bg-white/70 rounded-lg border border-black/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-black">{apiKey.name}</span>
                      <Badge variant={apiKey.isActive ? 'success' : 'destructive'}>
                        {apiKey.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteKey(apiKey._id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>

                  {/* API Key with Eye and Copy buttons */}
                  <div className="flex items-center gap-2 bg-black/5 rounded-lg p-2 border border-black/10">
                    <code className="flex-1 text-sm text-black/70 font-mono break-all">
                      {visibleKeys.has(apiKey._id) ? apiKey.key : maskKey(apiKey.key)}
                    </code>

                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => toggleKeyVisibility(apiKey._id)}
                      title={visibleKeys.has(apiKey._id) ? 'Hide API Key' : 'Show API Key'}
                    >
                      {visibleKeys.has(apiKey._id) ? (
                        <EyeOff className="h-4 w-4 text-black/60" />
                      ) : (
                        <Eye className="h-4 w-4 text-black/60" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => copyToClipboard(apiKey._id, apiKey.key)}
                      title="Copy to clipboard"
                    >
                      {copiedKeyId === apiKey._id ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-black/60" />
                      )}
                    </Button>
                  </div>

                  <div className="text-xs text-black/50 mt-2">
                    Created: {new Date(apiKey.createdAt).toLocaleDateString()}
                    {apiKey.lastUsedAt && (
                      <> | Last used: {new Date(apiKey.lastUsedAt).toLocaleDateString()}</>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card className="mt-8 bg-white/50 border-black/10">
        <CardHeader>
          <CardTitle className="text-lg text-black">How to Use</CardTitle>
          <CardDescription className="text-black/60">
            Include your API key in the request header when creating actions:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto text-sm">
            <code className="text-[#00D395]">{`// Using fetch
fetch('https://your-app.com/api/actions/your-action', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'mk_your_api_key_here'
  },
  body: JSON.stringify({ ... })
});`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
