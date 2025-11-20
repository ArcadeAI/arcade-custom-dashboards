/**
 * Arcade Client for Demo App
 * This integrates the framework-agnostic SDK
 */

// Import types directly from the SDK
export interface Tool {
  id: string;
  name: string;
  description: string;
  category?: string;
  server_id?: string;
  requires_auth?: boolean;
  input_schema?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface ToolDetail extends Tool {
  examples?: Array<{
    input: Record<string, any>;
    output: any;
  }>;
  documentation_url?: string;
  version?: string;
}

export interface MCPServer {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'error';
  tools_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface MCPServerDetail extends MCPServer {
  tools?: Tool[];
  configuration?: Record<string, any>;
  health_status?: {
    last_check: string;
    response_time_ms: number;
    error_count: number;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  organization?: string;
  created_at?: string;
}

export interface AuthConnection {
  id: string;
  provider: string;
  status: 'connected' | 'disconnected' | 'expired';
  scopes?: string[];
  connected_at?: string;
  expires_at?: string;
}

export interface AuthStatus {
  user: User;
  connections: AuthConnection[];
  api_key_scopes?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page?: number;
  per_page?: number;
  has_more?: boolean;
}

/**
 * Client-side wrapper for making API calls through Next.js API routes
 */
export class ArcadeClientWrapper {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async listTools(params?: { page?: number; per_page?: number; category?: string }): Promise<PaginatedResponse<Tool>> {
    return this.request<PaginatedResponse<Tool>>('/tools', params);
  }

  async getTool(toolId: string): Promise<ToolDetail> {
    return this.request<ToolDetail>(`/tools/${toolId}`);
  }

  async searchTools(query: string, params?: { category?: string }): Promise<PaginatedResponse<Tool>> {
    return this.request<PaginatedResponse<Tool>>('/tools', { ...params, q: query });
  }

  async listServers(params?: { page?: number; per_page?: number }): Promise<PaginatedResponse<MCPServer>> {
    return this.request<PaginatedResponse<MCPServer>>('/servers', params);
  }

  async getServer(serverId: string): Promise<MCPServerDetail> {
    return this.request<MCPServerDetail>(`/servers/${serverId}`);
  }

  async getUser(): Promise<User> {
    return this.request<User>('/user');
  }

  async getAuthStatus(): Promise<AuthStatus> {
    return this.request<AuthStatus>('/auth/status');
  }
}

// Export a singleton instance for use across the app
export const arcadeClient = new ArcadeClientWrapper();

