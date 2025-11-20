# Extensions & Customizations

This directory contains examples and hooks for extending the Arcade Dashboard.

## For Forward-Deployed Engineers

This is your workspace for implementing customer-specific customizations while keeping core functionality intact.

## Structure

```
extensions/
├── README.md           # This file
├── examples/          # Example customizations
│   ├── custom-theme/
│   ├── custom-page/
│   └── custom-integration/
└── hooks/             # Customization hooks
```

## Customization Patterns

### 1. Custom Pages

Create new pages without modifying core code:

```typescript
// extensions/examples/custom-page/analytics.tsx
'use client';

export default function AnalyticsPage() {
  return (
    <div>
      <h1>Custom Analytics Dashboard</h1>
      {/* Your custom implementation */}
    </div>
  );
}
```

Add to navigation via `config/features.config.ts`:

```typescript
navigation: {
  customItems: [
    { label: 'Analytics', href: '/analytics', icon: 'BarChart' },
  ],
}
```

### 2. Custom Themes

Override default theme in `app/globals.css`:

```css
/* extensions/examples/custom-theme/theme.css */
:root {
  --primary: your-custom-color;
  --secondary: your-custom-color;
  /* ... */
}
```

### 3. Custom Integrations

Add custom API integrations:

```typescript
// extensions/examples/custom-integration/slack-notify.ts
export async function notifySlack(message: string) {
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({ text: message }),
  });
}
```

### 4. Custom Chat Agents

Implement specialized agents:

```typescript
// extensions/examples/custom-integration/specialized-agent.ts
export class SpecializedAgent implements ChatAgent {
  async sendMessage(message: string): Promise<ChatMessage> {
    // Custom agent logic
  }
}
```

## Best Practices

1. **Keep Core Intact** — Don't modify core files directly
2. **Use Config First** — Try config files before custom code
3. **Document Changes** — Explain why customization was needed
4. **Test Thoroughly** — Ensure customizations don't break core features
5. **Version Control** — Track customizations separately

## Common Customizations

### Custom Authentication

```typescript
// extensions/examples/auth/custom-auth.ts
export async function customAuth(request: Request) {
  // Your auth logic
  const token = request.headers.get('Authorization');
  const user = await verifyToken(token);
  return user;
}
```

### Custom Analytics

```typescript
// extensions/examples/analytics/track.ts
export function trackEvent(event: string, properties: any) {
  // Send to your analytics platform
  analytics.track(event, properties);
}
```

### Custom Middleware

```typescript
// middleware.ts
import { customMiddleware } from './extensions/middleware';

export function middleware(request: NextRequest) {
  return customMiddleware(request);
}
```

## Support

For customization support:
- Review examples in this directory
- Check main documentation
- Contact Arcade forward-deployed engineers
- Join Discord community

## Examples

See `examples/` directory for complete working examples of common customizations.

