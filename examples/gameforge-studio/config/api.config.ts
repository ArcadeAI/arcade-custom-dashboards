/**
 * API Configuration
 * 
 * Configure Arcade API endpoints and settings.
 * Supports both Arcade Cloud and self-hosted instances.
 */

export const apiConfig = {
  // Arcade API Base URL
  // For Arcade Cloud: https://api.arcade.dev
  // For Self-hosted: https://your-arcade-instance.com
  baseUrl: process.env.ARCADE_API_BASE_URL || 'https://api.arcade.dev',
  
  // API Version
  version: process.env.ARCADE_API_VERSION || 'v1',
  
  // API Key (required)
  apiKey: process.env.ARCADE_API_KEY || '',
  
  // Request Configuration
  timeout: parseInt(process.env.ARCADE_API_TIMEOUT || '30000'), // 30 seconds
  retryAttempts: parseInt(process.env.ARCADE_RETRY_ATTEMPTS || '3'),
  
  // Endpoints (customizable for self-hosted)
  endpoints: {
    tools: process.env.ARCADE_ENDPOINT_TOOLS || '/v1/tools',
    toolkits: process.env.ARCADE_ENDPOINT_TOOLKITS || '/v1/toolkits',
    servers: process.env.ARCADE_ENDPOINT_SERVERS || '/v1/servers',
    user: process.env.ARCADE_ENDPOINT_USER || '/v1/user',
    authStatus: process.env.ARCADE_ENDPOINT_AUTH_STATUS || '/v1/auth/status',
  },
  
  // Feature Flags
  features: {
    enableRealAPI: process.env.ARCADE_ENABLE_REAL_API !== 'false',
    useMockData: process.env.ARCADE_USE_MOCK_DATA === 'true',
  },
} as const;

export type ApiConfig = typeof apiConfig;

/**
 * Helper to get full endpoint URL
 */
export function getEndpointUrl(endpoint: keyof typeof apiConfig.endpoints): string {
  return `${apiConfig.baseUrl}${apiConfig.endpoints[endpoint]}`;
}

/**
 * Check if API is configured
 */
export function isApiConfigured(): boolean {
  return !!apiConfig.apiKey && apiConfig.apiKey !== 'your_arcade_api_key_here';
}

