/**
 * Feature Flags Configuration
 * 
 * Control which features and pages are enabled in the dashboard.
 * Ideal for white-labeling: hide/show specific functionality based on your use case.
 */

export const features = {
  // Navigation Menu Items
  navigation: {
    showDashboard: process.env.NEXT_PUBLIC_SHOW_DASHBOARD !== 'false',
    showTools: process.env.NEXT_PUBLIC_SHOW_TOOLS !== 'false',
    showServers: process.env.NEXT_PUBLIC_SHOW_SERVERS !== 'false',
    showAuth: process.env.NEXT_PUBLIC_SHOW_AUTH !== 'false',
    showChat: process.env.NEXT_PUBLIC_SHOW_CHAT !== 'false',
    
    // Custom menu items (add your own pages)
    customItems: [
      // Example:
      // { label: 'Analytics', href: '/analytics', icon: 'BarChart' },
      // { label: 'Settings', href: '/settings', icon: 'Settings' },
    ],
  },
  
  // Chat Interface Configuration
  chat: {
    enabled: process.env.NEXT_PUBLIC_CHAT_ENABLED !== 'false',
    
    // Available modes: 'page', 'widget', 'sidebar'
    modes: (process.env.NEXT_PUBLIC_CHAT_MODES?.split(',') || ['page', 'widget']) as Array<'page' | 'widget' | 'sidebar'>,
    
    // Default mode when user first visits
    defaultMode: (process.env.NEXT_PUBLIC_CHAT_DEFAULT_MODE || 'widget') as 'page' | 'widget' | 'sidebar',
    
    // Chat widget position (for floating widget mode)
    widgetPosition: (process.env.NEXT_PUBLIC_CHAT_WIDGET_POSITION || 'bottom-right') as 'bottom-right' | 'bottom-left',
    
    // Enable chat on specific pages
    enableOnTools: process.env.NEXT_PUBLIC_CHAT_ON_TOOLS !== 'false',
    enableOnServers: process.env.NEXT_PUBLIC_CHAT_ON_SERVERS !== 'false',
  },
  
  // Dashboard Features
  dashboard: {
    showStats: process.env.NEXT_PUBLIC_DASHBOARD_SHOW_STATS !== 'false',
    showRecentTools: process.env.NEXT_PUBLIC_DASHBOARD_SHOW_RECENT_TOOLS !== 'false',
    showServers: process.env.NEXT_PUBLIC_DASHBOARD_SHOW_SERVERS !== 'false',
    recentToolsLimit: parseInt(process.env.NEXT_PUBLIC_DASHBOARD_RECENT_TOOLS_LIMIT || '6'),
    serversLimit: parseInt(process.env.NEXT_PUBLIC_DASHBOARD_SERVERS_LIMIT || '4'),
  },
  
  // Tools Page Features
  tools: {
    enableSearch: process.env.NEXT_PUBLIC_TOOLS_ENABLE_SEARCH !== 'false',
    enableFilters: process.env.NEXT_PUBLIC_TOOLS_ENABLE_FILTERS !== 'false',
    enableCategoryFilter: process.env.NEXT_PUBLIC_TOOLS_ENABLE_CATEGORY_FILTER !== 'false',
    defaultView: (process.env.NEXT_PUBLIC_TOOLS_DEFAULT_VIEW || 'grid') as 'grid' | 'list',
    perPage: parseInt(process.env.NEXT_PUBLIC_TOOLS_PER_PAGE || '50'),
  },
  
  // UI Features
  ui: {
    darkModeToggle: process.env.NEXT_PUBLIC_DARK_MODE_TOGGLE !== 'false',
    showBranding: process.env.NEXT_PUBLIC_SHOW_BRANDING !== 'false',
    showFooter: process.env.NEXT_PUBLIC_SHOW_FOOTER !== 'false',
    compactMode: process.env.NEXT_PUBLIC_COMPACT_MODE === 'true',
  },
  
  // Authentication & Authorization
  auth: {
    showConnectionStatus: process.env.NEXT_PUBLIC_SHOW_CONNECTION_STATUS !== 'false',
    showUserInfo: process.env.NEXT_PUBLIC_SHOW_USER_INFO !== 'false',
    showScopes: process.env.NEXT_PUBLIC_SHOW_SCOPES !== 'false',
  },
  
  // Advanced Features
  advanced: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    
    enableErrorTracking: process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING === 'true',
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    
    enableFeatureFlags: process.env.NEXT_PUBLIC_ENABLE_FEATURE_FLAGS === 'true',
  },
} as const;

export type FeaturesConfig = typeof features;

/**
 * Helper function to check if a feature is enabled
 */
export function isFeatureEnabled(feature: string): boolean {
  const parts = feature.split('.');
  let current: any = features;
  
  for (const part of parts) {
    if (current[part] === undefined) return false;
    current = current[part];
  }
  
  return current === true;
}

/**
 * Get all enabled navigation items
 */
export function getEnabledNavigationItems() {
  const items = [];
  
  if (features.navigation.showDashboard) {
    items.push({ label: 'Dashboard', href: '/', icon: 'Home' });
  }
  if (features.navigation.showTools) {
    items.push({ label: 'Tools', href: '/tools', icon: 'Wrench' });
  }
  if (features.navigation.showServers) {
    items.push({ label: 'Servers', href: '/servers', icon: 'Server' });
  }
  if (features.navigation.showAuth) {
    items.push({ label: 'Auth', href: '/auth', icon: 'Shield' });
  }
  if (features.navigation.showChat && features.chat.enabled) {
    items.push({ label: 'Chat', href: '/chat', icon: 'MessageSquare' });
  }
  
  // Add custom items
  items.push(...features.navigation.customItems);
  
  return items;
}

