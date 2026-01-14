'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ActionMetadata } from '@dipansrimany/mlink-sdk';
import { validateActionMetadata } from '@dipansrimany/mlink-sdk';

interface UseActionResult {
  metadata: ActionMetadata | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useAction(actionUrl: string | null): UseActionResult {
  const [metadata, setMetadata] = useState<ActionMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetadata = useCallback(async () => {
    if (!actionUrl) {
      setError('No action URL provided');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(actionUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch action: ${response.statusText}`);
      }

      const data = await response.json();

      // Check for error response
      if (data.error) {
        throw new Error(data.error.message || 'Action returned an error');
      }

      // Validate the metadata
      const validation = validateActionMetadata(data);
      if (!validation.success) {
        throw new Error('Invalid action metadata');
      }

      setMetadata(validation.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch action';
      setError(message);
      setMetadata(null);
    } finally {
      setIsLoading(false);
    }
  }, [actionUrl]);

  useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  return {
    metadata,
    isLoading,
    error,
    refetch: fetchMetadata,
  };
}
