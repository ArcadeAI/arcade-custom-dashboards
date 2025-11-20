# FinTech Pro Dashboard - Component Reference

**File**: `app/examples/fintech/page.tsx`

## Available Widgets

### KPI Bar (4 metrics)
- Total Tools
- Toolkits Count
- Authorized Tools
- Connected Accounts
**Location**: Lines ~50-90 (inline styled divs)

### Toolkit Distribution Chart
- Horizontal bars showing tools per toolkit
- Real data from API (top 5 toolkits)
- Hover effects
**Location**: Lines ~100-140

### Authorization Gauge
- Circular progress showing % of tools with OAuth
- Real data: authorized tools / total tools
**Location**: Lines ~200-250

### Tools Data Table
- Professional table layout
- 12 rows of real tools
- Sortable columns
- Hover effects
**Location**: Lines ~150-180

### Recently Added Tools List
- Last 4 tools from API
- Activity feed style
**Location**: Lines ~260-290

## Styling Approach

- **Tech**: Inline CSS (no Tailwind)
- **Colors**: Blue (#2563eb) + Green (#10b981)
- **Theme**: Light professional
- **Layout**: 2-column (main content + sidebar)

## Real API Data Used

- All metrics calculated from `arcadeClient.listTools({ per_page: 100 })`
- Toolkit distribution: Grouped by `item.toolkit.name`
- Authorization: Counted from `item.requirements.authorization`

