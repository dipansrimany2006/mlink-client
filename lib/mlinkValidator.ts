export interface ActionMetadata {
  title: string;
  icon: string;
  description: string;
  actions?: unknown[];
}

export interface ValidationResult {
  isValid: boolean;
  metadata?: ActionMetadata;
  error?: string;
}

/**
 * Validates that an action URL returns valid ActionMetadata
 */
export async function validateActionUrl(actionUrl: string): Promise<ValidationResult> {
  // Validate URL format
  try {
    new URL(actionUrl);
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }

  // Must be HTTPS in production
  if (process.env.NODE_ENV === 'production' && !actionUrl.startsWith('https://')) {
    return { isValid: false, error: 'Action URL must use HTTPS' };
  }

  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(actionUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        isValid: false,
        error: `Action endpoint returned ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();

    // Validate required fields
    if (!data.title || typeof data.title !== 'string') {
      return { isValid: false, error: 'Action metadata missing required "title" field' };
    }
    if (!data.icon || typeof data.icon !== 'string') {
      return { isValid: false, error: 'Action metadata missing required "icon" field' };
    }
    if (!data.description || typeof data.description !== 'string') {
      return { isValid: false, error: 'Action metadata missing required "description" field' };
    }

    return {
      isValid: true,
      metadata: {
        title: data.title,
        icon: data.icon,
        description: data.description,
        actions: data.actions,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return { isValid: false, error: 'Action endpoint timed out (>10s)' };
      }
      return {
        isValid: false,
        error: `Failed to fetch action metadata: ${error.message}`,
      };
    }
    return {
      isValid: false,
      error: 'Failed to fetch action metadata: Unknown error',
    };
  }
}
