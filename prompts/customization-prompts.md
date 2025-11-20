# AI Customization Prompts

Pre-written prompts to help AI assistants customize the Arcade Composable Dashboard quickly.

## Branding Customization

### Change Company Branding

```
Update the dashboard branding to:
- Company Name: [YOUR_COMPANY_NAME]
- Tagline: [YOUR_TAGLINE]
- Primary Color: [HEX_COLOR]
- Secondary Color: [HEX_COLOR]

Update both config/branding.config.ts and env.example files.
```

### Change Color Scheme

```
Change the dashboard color scheme to use [BRAND_COLORS]. Update:
- The purple/orange gradients to [NEW_COLORS]
- Hero section gradient
- Button gradients
- Icon colors
- Chart colors
Maintain the same visual style but with the new colors.
```

### Add Custom Logo

```
Add support for custom logo images:
1. Update config/branding.config.ts to use logo path
2. Create placeholder in public/branding/
3. Update Navigation component to display the logo
4. Support both light and dark mode versions
```

## Feature Additions

### Add New Analytics Widget

```
Add a new analytics widget to the dashboard showing [METRIC_NAME]:
- Create the component in components/
- Add it to app/page.tsx in the analytics section
- Use the same styling as existing analytics cards
- Make it clickable to expand in full-screen modal
```

### Add New Page

```
Create a new page at /[PAGE_NAME] that shows [FUNCTIONALITY]:
- Create app/[PAGE_NAME]/page.tsx
- Add navigation item in components/navigation.tsx
- Use consistent styling with other pages
- Add back button to return to dashboard
```

### Add Custom Metric

```
Add a new stat card showing [METRIC_NAME]:
- Add to the stats grid on the dashboard
- Use appropriate icon from lucide-react
- Use gradient colors matching the theme
- Fetch data from [API_ENDPOINT or calculation]
```

## API Integration

### Integrate New Arcade Endpoint

```
Integrate the Arcade API endpoint [ENDPOINT_URL]:
1. Add route in app/api/[NAME]/route.ts
2. Use getArcadeClient() to call the endpoint
3. Transform response to match our format
4. Add TypeScript types if needed
5. Create UI component to display the data
```

### Add Tool Execution

```
Add the ability to execute tools from the dashboard:
1. Create execute API route: app/api/tools/[id]/execute/route.ts
2. Add "Execute" button to tool detail modal
3. Show input form based on tool's input_schema
4. Display execution results
5. Handle errors gracefully
```

## Chat Customization

### Connect OpenAI

```
Connect OpenAI GPT-4 to the chat interface:
1. Update chat/agent-plugin.ts OpenAIChatAgent class
2. Add NEXT_PUBLIC_OPENAI_API_KEY to env.example
3. Set NEXT_PUBLIC_CHAT_AGENT_TYPE=openai in config
4. Test the chat interface works
```

### Connect Custom AI API

```
Connect our custom AI API at [API_URL]:
1. Update CustomAPIAgent in chat/agent-plugin.ts
2. Add API endpoint and key to environment variables
3. Implement error handling
4. Add streaming support if available
5. Test end-to-end
```

## UI Customization

### Make It More Compact

```
Make the dashboard UI more compact and information-dense:
- Reduce padding and spacing throughout
- Make fonts smaller
- Tighten grids
- Reduce card heights
- Keep the elegant, minimalistic style
```

### Add Dark/Light Mode

```
Add theme switching between dark and light modes:
- Create theme switcher component
- Add CSS for light mode styles
- Save preference to localStorage
- Add toggle button in navigation
```

### Change Layout

```
Reorganize the dashboard layout to show:
- [SECTION_1] at the top
- [SECTION_2] in the middle
- [SECTION_3] at the bottom
Keep the same styling and components, just rearrange.
```

## Deployment Customization

### Add Custom Domain

```
Configure the dashboard for custom domain [DOMAIN]:
1. Update NEXT_PUBLIC_CUSTOM_DOMAIN in config
2. Add SSL certificate instructions
3. Update nginx/deployment configs if needed
4. Document DNS setup
```

### Multi-Tenant Setup

```
Set up multi-tenant deployment where each customer has their own branding:
1. Create tenant configuration system
2. Load branding based on domain or tenant ID
3. Update docker-compose for multiple instances
4. Document how to add new tenants
```

## How to Use These Prompts

1. Copy the relevant prompt
2. Replace placeholders [IN_BRACKETS] with your values
3. Send to your AI assistant (Claude, GPT-4, etc.)
4. The AI will have context from llm.txt to make appropriate changes

## Example Usage

```
[Copy prompt above]

Change the dashboard color scheme to use #FF6B6B (red) and #4ECDC4 (teal). Update:
- The purple/orange gradients to red/teal
- Hero section gradient
- Button gradients
- Icon colors
- Chart colors
Maintain the same visual style but with the new colors.
```

The AI assistant will then make all necessary changes while maintaining code quality and consistency.

