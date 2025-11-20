/**
 * White-label Branding Configuration
 * 
 * Customize this file to rebrand the dashboard for your organization.
 * All values can be overridden via environment variables for multi-tenant deployments.
 */

export const branding = {
  // Company Information
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'GameForge Studios',
  companyTagline: process.env.NEXT_PUBLIC_COMPANY_TAGLINE || 'Composable Dashboards Powered by Arcade - Expose secure, actionable tools to your customers and agents',
  companyUrl: process.env.NEXT_PUBLIC_COMPANY_URL || 'https://gameforge.studio',
  
  // Visual Assets
  logo: process.env.NEXT_PUBLIC_LOGO_PATH || '/branding/logo.svg',
  logoLight: process.env.NEXT_PUBLIC_LOGO_LIGHT_PATH || '/branding/logo-light.svg',
  logoDark: process.env.NEXT_PUBLIC_LOGO_DARK_PATH || '/branding/logo-dark.svg',
  favicon: process.env.NEXT_PUBLIC_FAVICON_PATH || '/branding/favicon.ico',
  
  // Color Scheme (Purple/Orange - Arcade colors)
  colors: {
    primary: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#8b5cf6',
    secondary: process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#f97316',
    accent: process.env.NEXT_PUBLIC_ACCENT_COLOR || '#ec4899',
  },
  
  // Typography
  font: {
    family: process.env.NEXT_PUBLIC_FONT_FAMILY || 'Inter',
    // Optional: Custom font URL (e.g., Google Fonts, self-hosted)
    url: process.env.NEXT_PUBLIC_FONT_URL,
    weights: [400, 500, 600, 700],
  },
  
  // Domain Configuration
  customDomain: process.env.NEXT_PUBLIC_CUSTOM_DOMAIN,
  
  // Email Configuration
  email: {
    from: process.env.EMAIL_FROM || 'noreply@arcade.dev',
    fromName: process.env.EMAIL_FROM_NAME || 'Arcade Dashboard',
    supportEmail: process.env.SUPPORT_EMAIL || 'support@arcade.dev',
  },
  
  // Social Links (optional)
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    github: process.env.NEXT_PUBLIC_GITHUB_URL,
    discord: process.env.NEXT_PUBLIC_DISCORD_URL,
  },
  
  // Footer
  footer: {
    copyrightText: process.env.NEXT_PUBLIC_COPYRIGHT_TEXT || '© 2024 Arcade AI, Inc.',
    showPoweredBy: process.env.NEXT_PUBLIC_SHOW_POWERED_BY !== 'false',
    links: [
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Terms of Service', url: '/terms' },
      { label: 'Documentation', url: '/docs' },
    ],
  },
} as const;

export type BrandingConfig = typeof branding;

