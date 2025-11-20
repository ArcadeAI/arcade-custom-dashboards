# HealthCare Hub Dashboard - Component Reference

**File**: `app/examples/healthcare/page.tsx`

## Available Widgets

### Circular Vitals Gauges (4 gauges)
- Total Tools
- Tools with Auth
- Toolkits Count
- Servers Count

Each with:
- Circular SVG progress
- Icon in center
- Real percentage display
**Location**: Lines ~80-130

### Tools by Category Chart
- Horizontal bars
- Real category distribution from API
- Top 4 categories
**Location**: Lines ~160-200

### Quick Stats Cards (2 featured cards)
- Available Tools (with gradient background)
- Secured with OAuth
**Location**: Lines ~210-250

### Tools Card Grid
- 10 tools in clean card layout
- Medical icons
- Hover lift effect
- Category badges
**Location**: Lines ~270-330

## Styling Approach

- **Tech**: Inline CSS with SVG components
- **Colors**: Teal (#14b8a6) + Blue (#0ea5e9)
- **Theme**: Clean, accessible, light
- **Layout**: Featured metrics top, card grid below

## Real API Data Used

- All from `arcadeClient.listTools({ per_page: 100 })`
- Circular gauges show real counts and percentages
- Category bars: Grouped and sorted by category

