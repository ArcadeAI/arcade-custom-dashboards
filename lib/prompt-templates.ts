/**
 * Prompt Template Generator
 * Creates AI prompts with full context for customizing dashboards
 */

export const taskOptions = [
  { value: 'customize-dashboard', label: 'Customize Entire Dashboard' },
  { value: 'extract-widget', label: 'Extract Specific Widget' },
  { value: 'change-branding', label: 'Change Branding/Colors' },
  { value: 'integrate-app', label: 'Add to Existing Project' },
  { value: 'deploy', label: 'Deploy to Production' },
] as const;

export const dashboardOptions = [
  { value: 'gameforge', label: 'GameForge Studio', description: 'Dark theme, gaming style' },
  { value: 'fintech', label: 'FinTech Pro', description: 'Light theme, data tables' },
  { value: 'healthcare', label: 'HealthCare Hub', description: 'Clean, circular gauges' },
] as const;

const arcadeApiContext = `
# Arcade API Quick Reference

Base URL: https://api.arcade.dev
Authentication: Bearer token via ARCADE_API_KEY

## Key Endpoints:
- GET /v1/tools?limit=1 - Get tools count (returns total_count)
- GET /v1/tools?limit=50 - List tools (returns items[] + total_count)
- Tool structure: { name, description, toolkit.name, requirements.authorization }

## Implementation:
- Server-side: app/api/tools/route.ts (proxies to Arcade)
- Client-side: lib/arcade-client.ts (calls Next.js API routes)
`;

const projectContext = `
# Arcade Custom Dashboards - Project Context

This is a showcase of 3 white-labelable dashboard variations for managing AI tools:
- GameForge Studio (dark, gaming style, Tailwind CSS)
- FinTech Pro (light, data tables, inline CSS)
- HealthCare Hub (clean, circular gauges, medical design)

All dashboards use real Arcade API data. Only differences are layout and styling.

Structure:
- app/examples/[dashboard]/page.tsx - Dashboard pages
- components/ - Shared UI components
- config/ - Branding and API configuration
- lib/arcade-client.ts - API client wrapper

Key features:
- Real-time tool data from Arcade API
- Interactive analytics with hover tooltips
- Clickable tools that open detail modals
- Expandable full-screen graphs
- Docker deployment ready
`;

const taskInstructions = {
  'customize-dashboard': {
    intro: 'I want to customize this dashboard for my brand and requirements.',
    instructions: `
Please help me:
1. Update the color scheme to match my brand
2. Modify the company name and tagline
3. Adjust the layout if needed
4. Keep all Arcade API integrations working

My brand colors are:
- Primary: [SPECIFY YOUR COLOR]
- Secondary: [SPECIFY YOUR COLOR]

My company name: [SPECIFY YOUR COMPANY]
`,
  },
  'extract-widget': {
    intro: 'I want to extract a specific widget/component from this dashboard to use in my own application.',
    instructions: `
Please help me:
1. Extract the analytics chart component
2. Show me the dependencies needed
3. Provide integration instructions
4. Make it work standalone

Which widget: [SPECIFY: line chart, donut chart, bar chart, stats cards, etc.]
`,
  },
  'change-branding': {
    intro: 'I want to rebrand this dashboard with my company identity.',
    instructions: `
Please help me:
1. Change company name and tagline
2. Update all color references
3. Update logo references
4. Modify any industry-specific terminology

My branding:
- Company: [YOUR COMPANY NAME]
- Tagline: [YOUR TAGLINE]
- Primary Color: [HEX CODE]
- Secondary Color: [HEX CODE]
`,
  },
  'integrate-app': {
    intro: 'I want to integrate this dashboard into my existing application.',
    instructions: `
Please help me:
1. Show me how to copy the necessary files
2. Explain the dependencies I need
3. Guide me through API setup
4. Help me integrate routing

My stack: [DESCRIBE YOUR TECH STACK]
My app structure: [DESCRIBE YOUR APP]
`,
  },
  'deploy': {
    intro: 'I want to deploy this dashboard to production.',
    instructions: `
Please help me:
1. Set up environment variables
2. Configure Docker deployment
3. Set up domain and SSL
4. Production optimization checklist

My deployment target: [SPECIFY: Vercel, AWS, Docker, etc.]
`,
  },
};

export function generatePrompt(task: string, dashboard: string): string {
  const taskConfig = taskInstructions[task as keyof typeof taskInstructions];
  const dashboardName = dashboardOptions.find(d => d.value === dashboard)?.label || dashboard;
  
  if (!taskConfig) {
    return 'Please select a task';
  }

  return `${taskConfig.intro}

Dashboard: ${dashboardName}

${projectContext}

${arcadeApiContext}

${taskConfig.instructions}

---

Copy this prompt and paste it into Claude, ChatGPT, or your AI assistant. Fill in the [BRACKETED] sections with your specific details.`;
}

// Pre-made prompts for quick tasks
export const quickPrompts = {
  'change-colors': `I want to change the dashboard colors to match my brand.

${projectContext}

Task: Update the color scheme throughout the dashboard.

My brand colors:
- Primary: [YOUR HEX CODE]
- Secondary: [YOUR HEX CODE]

Please update:
1. Gradient backgrounds
2. Button colors
3. Chart colors
4. Icon colors
5. Hover states

Keep the same layout and functionality, just update colors.`,

  'copy-widget': `I want to extract the analytics widget from this dashboard.

${projectContext}

${arcadeApiContext}

Task: Extract the interactive analytics chart component (line chart with hover tooltips).

Please provide:
1. The component code
2. Required dependencies
3. Integration instructions
4. Standalone usage example

I want to use it in: [DESCRIBE YOUR APP]`,

  'white-label': `I want to white-label this dashboard for my customer.

${projectContext}

Task: Rebrand this dashboard completely.

Customer details:
- Company Name: [CUSTOMER NAME]
- Industry: [INDUSTRY]
- Primary Color: [HEX]
- Secondary Color: [HEX]
- Logo: [DESCRIBE OR URL]

Update all branding, remove any references to example companies, and make it production-ready for this customer.`,

  'integrate': `I want to integrate this dashboard into my existing application.

${projectContext}

${arcadeApiContext}

Task: Help me integrate this into my app.

My application:
- Framework: [e.g., Next.js, React, Vue]
- Current structure: [DESCRIBE]
- Where I want to add it: [DESCRIBE]

Please show me:
1. Which files to copy
2. How to set up Arcade API
3. How to integrate routing
4. Any configuration needed`,

  'deploy': `I want to deploy this dashboard to production.

${projectContext}

Task: Help me deploy using Docker.

Setup:
1. Guide me through environment variables
2. Explain docker-compose.yml configuration
3. Help with domain setup
4. Production checklist

Deployment target: [SPECIFY: Docker, Vercel, AWS, etc.]
Custom domain: [YOUR DOMAIN]`,

  'add-feature': `I want to add a custom feature to this dashboard.

${projectContext}

${arcadeApiContext}

Task: Add new functionality to the dashboard.

Feature I want to add:
[DESCRIBE YOUR FEATURE]

Please help me:
1. Determine where to add it in the code
2. Implement the feature
3. Keep it consistent with the existing style
4. Ensure Arcade API integration works`,

  'connect-ai': `I want to connect my AI model to the chat interface.

${projectContext}

${arcadeApiContext}

Task: Integrate my AI model into the chat system.

My AI setup:
- Provider: [OpenAI, Anthropic, Custom API, etc.]
- API Endpoint: [IF CUSTOM]
- Model: [e.g., gpt-4, claude-3-opus]

Please show me:
1. How to update chat/agent-plugin.ts
2. Environment variables needed
3. How to test the integration
4. Error handling best practices`,

  'copy-component': `I want to copy a specific component from this dashboard.

${projectContext}

Task: Extract and adapt a component.

Component I want: [SPECIFY: stats cards, table, gauge, etc.]
Target framework: [React, Vue, Angular, etc.]

Please provide:
1. The component code
2. Dependencies
3. Styling approach
4. Usage example`,
};

export function getQuickPrompt(promptKey: keyof typeof quickPrompts): string {
  return quickPrompts[promptKey];
}

