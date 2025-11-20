/**
 * Mock Data for Demo
 * 
 * Until Arcade's API endpoints are fully documented, we use mock data.
 * Replace this with real API calls when endpoints are available.
 */

import type { Tool, MCPServer, User, AuthStatus, PaginatedResponse } from './arcade-client';

export const mockUser: User = {
  id: 'user-123',
  email: 'demo@gameforge.studio',
  name: 'Demo User',
  organization: 'GameForge Studios',
  created_at: '2024-01-15T10:00:00Z',
};

export const mockTools: Tool[] = [
  {
    id: 'tool-github-1',
    name: 'GitHub Create Issue',
    description: 'Create a new issue in a GitHub repository with detailed information',
    category: 'developer-tools',
    server_id: 'server-github',
    requires_auth: true,
    created_at: '2024-01-10T10:00:00Z',
  },
  {
    id: 'tool-github-2',
    name: 'GitHub List Repositories',
    description: 'List all repositories for a user or organization',
    category: 'developer-tools',
    server_id: 'server-github',
    requires_auth: true,
    created_at: '2024-01-10T10:00:00Z',
  },
  {
    id: 'tool-slack-1',
    name: 'Slack Send Message',
    description: 'Send a message to a Slack channel',
    category: 'communication',
    server_id: 'server-slack',
    requires_auth: true,
    created_at: '2024-01-12T10:00:00Z',
  },
  {
    id: 'tool-gdocs-1',
    name: 'Google Docs Create',
    description: 'Create a new Google Docs document',
    category: 'productivity',
    server_id: 'server-google',
    requires_auth: true,
    created_at: '2024-01-14T10:00:00Z',
  },
  {
    id: 'tool-gdrive-1',
    name: 'Google Drive Upload',
    description: 'Upload a file to Google Drive',
    category: 'productivity',
    server_id: 'server-google',
    requires_auth: true,
    created_at: '2024-01-14T10:00:00Z',
  },
  {
    id: 'tool-gmail-1',
    name: 'Gmail Send Email',
    description: 'Send an email via Gmail',
    category: 'communication',
    server_id: 'server-google',
    requires_auth: true,
    created_at: '2024-01-14T10:00:00Z',
  },
  {
    id: 'tool-jira-1',
    name: 'Jira Create Ticket',
    description: 'Create a new Jira ticket in your project',
    category: 'productivity',
    server_id: 'server-jira',
    requires_auth: true,
    created_at: '2024-01-16T10:00:00Z',
  },
  {
    id: 'tool-notion-1',
    name: 'Notion Create Page',
    description: 'Create a new page in Notion',
    category: 'productivity',
    server_id: 'server-notion',
    requires_auth: true,
    created_at: '2024-01-18T10:00:00Z',
  },
  {
    id: 'tool-linear-1',
    name: 'Linear Create Issue',
    description: 'Create a new issue in Linear',
    category: 'productivity',
    server_id: 'server-linear',
    requires_auth: true,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: 'tool-figma-1',
    name: 'Figma Export Frame',
    description: 'Export a frame from Figma as an image',
    category: 'design',
    server_id: 'server-figma',
    requires_auth: true,
    created_at: '2024-01-22T10:00:00Z',
  },
  {
    id: 'tool-stripe-1',
    name: 'Stripe Create Customer',
    description: 'Create a new customer in Stripe',
    category: 'payments',
    server_id: 'server-stripe',
    requires_auth: true,
    created_at: '2024-01-24T10:00:00Z',
  },
  {
    id: 'tool-hubspot-1',
    name: 'HubSpot Create Contact',
    description: 'Create a new contact in HubSpot CRM',
    category: 'sales',
    server_id: 'server-hubspot',
    requires_auth: true,
    created_at: '2024-01-26T10:00:00Z',
  },
];

export const mockServers: MCPServer[] = [
  {
    id: 'server-github',
    name: 'GitHub MCP Server',
    description: 'Model Context Protocol server for GitHub integration',
    status: 'active',
    tools_count: 8,
    created_at: '2024-01-10T10:00:00Z',
  },
  {
    id: 'server-slack',
    name: 'Slack MCP Server',
    description: 'Integrate with Slack workspaces and channels',
    status: 'active',
    tools_count: 6,
    created_at: '2024-01-12T10:00:00Z',
  },
  {
    id: 'server-google',
    name: 'Google Workspace Server',
    description: 'Access Google Docs, Drive, Gmail, and Calendar',
    status: 'active',
    tools_count: 12,
    created_at: '2024-01-14T10:00:00Z',
  },
  {
    id: 'server-jira',
    name: 'Jira MCP Server',
    description: 'Manage Jira projects, issues, and workflows',
    status: 'active',
    tools_count: 7,
    created_at: '2024-01-16T10:00:00Z',
  },
  {
    id: 'server-notion',
    name: 'Notion MCP Server',
    description: 'Create and manage Notion pages and databases',
    status: 'active',
    tools_count: 5,
    created_at: '2024-01-18T10:00:00Z',
  },
  {
    id: 'server-linear',
    name: 'Linear MCP Server',
    description: 'Issue tracking and project management with Linear',
    status: 'active',
    tools_count: 6,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: 'server-figma',
    name: 'Figma MCP Server',
    description: 'Design collaboration and export from Figma',
    status: 'inactive',
    tools_count: 4,
    created_at: '2024-01-22T10:00:00Z',
  },
  {
    id: 'server-stripe',
    name: 'Stripe MCP Server',
    description: 'Payment processing and subscription management',
    status: 'active',
    tools_count: 9,
    created_at: '2024-01-24T10:00:00Z',
  },
  {
    id: 'server-hubspot',
    name: 'HubSpot MCP Server',
    description: 'CRM and marketing automation with HubSpot',
    status: 'active',
    tools_count: 11,
    created_at: '2024-01-26T10:00:00Z',
  },
];

export const mockAuthStatus: AuthStatus = {
  user: mockUser,
  connections: [
    {
      id: 'conn-github',
      provider: 'github',
      status: 'connected',
      scopes: ['repo', 'user', 'admin:org'],
      connected_at: '2024-01-15T10:00:00Z',
      expires_at: '2024-07-15T10:00:00Z',
    },
    {
      id: 'conn-google',
      provider: 'google',
      status: 'connected',
      scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/gmail.send'],
      connected_at: '2024-01-16T10:00:00Z',
      expires_at: '2024-07-16T10:00:00Z',
    },
    {
      id: 'conn-slack',
      provider: 'slack',
      status: 'connected',
      scopes: ['chat:write', 'channels:read'],
      connected_at: '2024-01-17T10:00:00Z',
    },
    {
      id: 'conn-notion',
      provider: 'notion',
      status: 'expired',
      scopes: ['read_content', 'update_content'],
      connected_at: '2024-01-18T10:00:00Z',
      expires_at: '2024-02-18T10:00:00Z',
    },
  ],
  api_key_scopes: ['read:tools', 'read:servers', 'execute:tools'],
};

export function getMockTools(params?: { per_page?: number; category?: string; q?: string }): PaginatedResponse<Tool> {
  let filtered = [...mockTools];
  
  // Filter by category
  if (params?.category) {
    filtered = filtered.filter(t => t.category === params.category);
  }
  
  // Filter by search query
  if (params?.q) {
    const query = params.q.toLowerCase();
    filtered = filtered.filter(t => 
      t.name.toLowerCase().includes(query) || 
      t.description.toLowerCase().includes(query)
    );
  }
  
  // Paginate
  const perPage = params?.per_page || 20;
  const paginated = filtered.slice(0, perPage);
  
  return {
    data: paginated,
    total: filtered.length,
    page: 1,
    per_page: perPage,
    has_more: filtered.length > perPage,
  };
}

export function getMockServers(params?: { per_page?: number }): PaginatedResponse<MCPServer> {
  const perPage = params?.per_page || 20;
  const paginated = mockServers.slice(0, perPage);
  
  return {
    data: paginated,
    total: mockServers.length,
    page: 1,
    per_page: perPage,
    has_more: mockServers.length > perPage,
  };
}

