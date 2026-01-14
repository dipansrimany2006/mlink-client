'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, XCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ValidationResult {
  isValid: boolean;
  metadata?: {
    title: string;
    description: string;
    icon: string;
  };
  error?: string;
}

export default function RegisterMlinkPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const [apiKey, setApiKey] = useState('');
  const [actionUrl, setActionUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [tags, setTags] = useState('');

  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  const validateUrl = async () => {
    if (!actionUrl) {
      setValidationResult({ isValid: false, error: 'Please enter an action URL' });
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      const response = await fetch(actionUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.title && data.icon && data.description) {
        setValidationResult({
          isValid: true,
          metadata: {
            title: data.title,
            description: data.description,
            icon: data.icon,
          },
        });
        // Auto-fill if empty
        if (!name) setName(data.title);
        if (!description) setDescription(data.description);
        if (!icon) setIcon(data.icon);
      } else {
        setValidationResult({
          isValid: false,
          error: 'Invalid action metadata: missing title, icon, or description',
        });
      }
    } catch (err) {
      setValidationResult({
        isValid: false,
        error: err instanceof Error ? err.message : 'Could not reach action URL',
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!apiKey) {
      setSubmitError('Please enter your API key');
      return;
    }

    if (!actionUrl) {
      setSubmitError('Please enter an action URL');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/registry/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          actionUrl,
          name: name || undefined,
          description: description || undefined,
          icon: icon || undefined,
          tags: tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      router.push('/dashboard/mlinks');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to register MLink');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="mb-6 -ml-2 text-black/60 hover:text-black hover:bg-black/5"
      >
        <Link href="/dashboard/mlinks">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to MLinks
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-black">Register an MLink</h1>
        <p className="text-black/60">
          Register your action endpoint to the MLink registry
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* API Key */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">
            API Key <span className="text-destructive">*</span>
          </label>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="mk_xxxxxxxx..."
            className="bg-white border-black/20"
          />
          <p className="text-xs text-black/50">
            Get your API key from the{' '}
            <Link href="/dashboard" className="text-[#00D395] hover:underline">
              API Keys page
            </Link>
          </p>
        </div>

        {/* Action URL */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">
            Action URL <span className="text-destructive">*</span>
          </label>
          <div className="flex gap-2">
            <Input
              type="url"
              value={actionUrl}
              onChange={(e) => {
                setActionUrl(e.target.value);
                setValidationResult(null);
              }}
              placeholder="https://your-app.com/api/actions/your-action"
              className="flex-1 bg-white border-black/20"
            />
            <Button
              type="button"
              variant="outline"
              onClick={validateUrl}
              disabled={isValidating || !actionUrl}
              className="border-black/20 text-black hover:bg-black/5"
            >
              {isValidating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Validating
                </>
              ) : (
                'Validate'
              )}
            </Button>
          </div>

          {/* Validation Result */}
          {validationResult && (
            <div
              className={`mt-3 p-4 rounded-lg ${
                validationResult.isValid
                  ? 'bg-[#00D395]/10 border border-[#00D395]/30'
                  : 'bg-destructive/10 border border-destructive/30'
              }`}
            >
              {validationResult.isValid ? (
                <div className="flex items-start gap-3">
                  {validationResult.metadata?.icon && (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-black/5 flex-shrink-0">
                      <Image
                        src={validationResult.metadata.icon}
                        alt="Action icon"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="h-4 w-4 text-[#00D395]" />
                      <p className="font-medium text-[#00D395]">
                        {validationResult.metadata?.title}
                      </p>
                    </div>
                    <p className="text-sm text-black/60">
                      {validationResult.metadata?.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  <p className="text-destructive text-sm">{validationResult.error}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Name (optional override) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">
            Name{' '}
            <span className="text-black/50 font-normal">(optional - auto-filled from action)</span>
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Awesome Action"
            maxLength={100}
            className="bg-white border-black/20"
          />
        </div>

        {/* Description (optional override) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">
            Description{' '}
            <span className="text-black/50 font-normal">(optional - auto-filled from action)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What does your action do?"
            maxLength={500}
            rows={3}
            className="flex w-full rounded-md border border-black/20 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          />
        </div>

        {/* Icon (optional override) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">
            Icon URL{' '}
            <span className="text-black/50 font-normal">(optional - auto-filled from action)</span>
          </label>
          <Input
            type="url"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="https://example.com/icon.png"
            className="bg-white border-black/20"
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">
            Tags <span className="text-black/50 font-normal">(optional, comma-separated)</span>
          </label>
          <Input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="defi, swap, trading"
            className="bg-white border-black/20"
          />
          <p className="text-xs text-black/50">Maximum 10 tags</p>
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
              <p className="text-destructive text-sm">{submitError}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-black text-white hover:bg-black/80"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Registering...
              </>
            ) : (
              'Register MLink'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/mlinks')}
            className="border-black/20 text-black hover:bg-black/5"
          >
            Cancel
          </Button>
        </div>
      </form>

      {/* Info Section */}
      <Card className="mt-8 bg-white/50 border-black/10">
        <CardHeader>
          <CardTitle className="text-lg text-black">How it works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm text-black/60">
            <li>Enter your API key from the API Keys page</li>
            <li>Enter your action endpoint URL and click Validate</li>
            <li>Optionally customize the name, description, and icon</li>
            <li>Add relevant tags to help users discover your MLink</li>
            <li>Submit for review - your MLink will be pending until approved</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
