import { NextRequest } from 'next/server';
import connectToDatabase from './mongodb';
import ApiKey from '@/models/ApiKey';

export interface AuthResult {
  isValid: boolean;
  ownerAddress?: string;
  error?: string;
}

/**
 * Validate an API key from the request headers
 * Expected header: x-api-key: mk_xxxxx
 */
export async function validateApiKey(request: NextRequest): Promise<AuthResult> {
  const apiKey = request.headers.get('x-api-key');

  if (!apiKey) {
    return {
      isValid: false,
      error: 'API key is required. Add x-api-key header.',
    };
  }

  if (!apiKey.startsWith('mk_')) {
    return {
      isValid: false,
      error: 'Invalid API key format.',
    };
  }

  try {
    await connectToDatabase();

    const key = await ApiKey.findOne({ key: apiKey, isActive: true });

    if (!key) {
      return {
        isValid: false,
        error: 'Invalid or inactive API key.',
      };
    }

    // Update last used timestamp
    key.lastUsedAt = new Date();
    await key.save();

    return {
      isValid: true,
      ownerAddress: key.ownerAddress,
    };
  } catch (error) {
    console.error('API key validation error:', error);
    return {
      isValid: false,
      error: 'Failed to validate API key.',
    };
  }
}
