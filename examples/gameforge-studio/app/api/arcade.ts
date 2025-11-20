/**
 * Server-side Arcade API client
 * This uses the SDK on the server to make requests to Arcade API
 */

// Inline SDK types and client since we're in the same monorepo
interface ArcadeClientConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  retryAttempts?: number;
}

function buildUrl(baseUrl: string, path: string, params?: Record<string, string | number | boolean>): string {
  const url = new URL(path, baseUrl);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  
  return url.toString();
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isNetworkError(error: any): boolean {
  return (
    error.name === 'NetworkError' ||
    error.message?.includes('network') ||
    error.message?.includes('fetch')
  );
}

export class ArcadeAPIClient {
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;
  private retryAttempts: number;

  constructor(config: ArcadeClientConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || process.env.ARCADE_API_BASE_URL || 'https://api.arcade.dev';
    this.timeout = config.timeout || 30000;
    this.retryAttempts = config.retryAttempts || 3;
  }

  private async request<T>(
    method: string,
    path: string,
    params?: Record<string, string | number | boolean>
  ): Promise<T> {
    const url = buildUrl(this.baseUrl, path, params);
    let lastError: any;

    for (let attempt = 0; attempt < this.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(url, {
          method,
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const error: any = {
            error: errorData.error || 'API Error',
            message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
            status_code: response.status,
            details: errorData.details,
          };
          throw error;
        }

        return await response.json();
      } catch (error: any) {
        lastError = error;

        // Don't retry on 4xx errors
        if (error.status_code && error.status_code >= 400 && error.status_code < 500) {
          throw error;
        }

        // Retry on network errors or 5xx errors
        if (attempt < this.retryAttempts - 1 && (isNetworkError(error) || error.status_code >= 500)) {
          const backoffMs = Math.min(1000 * Math.pow(2, attempt), 10000);
          await sleep(backoffMs);
          continue;
        }

        throw error;
      }
    }

    throw lastError;
  }

  async get<T>(path: string, params?: Record<string, string | number | boolean>): Promise<T> {
    return this.request<T>('GET', path, params);
  }
}

// Create singleton instance
let arcadeClient: ArcadeAPIClient | null = null;

export function getArcadeClient(): ArcadeAPIClient {
  if (!arcadeClient) {
    const apiKey = process.env.ARCADE_API_KEY;
    if (!apiKey) {
      throw new Error('ARCADE_API_KEY environment variable is not set');
    }

    arcadeClient = new ArcadeAPIClient({
      apiKey,
      baseUrl: process.env.ARCADE_API_BASE_URL || 'https://api.arcade.dev',
      timeout: parseInt(process.env.ARCADE_API_TIMEOUT || '30000'),
      retryAttempts: parseInt(process.env.ARCADE_RETRY_ATTEMPTS || '3'),
    });
  }

  return arcadeClient;
}

