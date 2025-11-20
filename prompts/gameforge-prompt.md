# GameForge Studio Dashboard - Component Reference

**File**: `app/examples/gameforge/page.tsx`

## Available Widgets

### Stats Cards (4 cards in a row)
- Total Tools
- MCP Servers  
- Connections
- Success Rate Status
**Location**: Lines ~60-100

### Analytics Charts
1. **Line Chart**: Tool Execution Activity (with hover tooltips)
   - Shows 7 days of data
   - Interactive hover showing exact numbers
   - Click to expand full-screen
   
2. **Donut Chart**: Tools by Category
   - Shows category distribution
   - Hover shows percentages
   
3. **Bar Chart**: Top Tools by Usage
   - Horizontal bars with gradients
   - Shows top 4 tools

**Location**: Lines ~110-180

### Tools Grid
- Displays 12 tools
- Purple/orange gradient icons
- Click navigates to tools page
**Location**: Lines ~190-230

### MCP Servers Grid
- Shows 9 servers
- Status indicators
- Click navigates to servers page
**Location**: Lines ~240-280

## Styling Approach

- **Tech**: Tailwind CSS
- **Colors**: Purple (#8b5cf6) + Orange (#f97316)
- **Theme**: Dark with gradient accents
- **Components**: `components/analytics-chart.tsx`

## Real API Data Used

- Tool count: `arcadeClient.listTools({ per_page: 1 })`
- Tools list: `arcadeClient.listTools({ per_page: 50 })`
- Servers: `arcadeClient.listServers()`
- Connections: `arcadeClient.getAuthStatus()`

