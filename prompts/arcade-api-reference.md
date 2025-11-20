# Arcade API Quick Reference

**Base URL**: `https://api.arcade.dev`  
**Authentication**: `Authorization: Bearer YOUR_ARCADE_API_KEY`

## Tools API

### Get Tools Count
```bash
curl "https://api.arcade.dev/v1/tools?limit=1" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response**:
```json
{
  "tools": [...],
  "total_count": 123
}
```

### List Tools
```bash
curl "https://api.arcade.dev/v1/tools?limit=50" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Query Parameters**:
- `limit` - Number of tools to return (default: 20)
- `toolkit` - Filter by toolkit name (optional)
- **Note**: Avoid using `q` parameter as it can interfere with count

**Response**:
```json
{
  "tools": [
    {
      "id": "tool_abc123",
      "name": "GitHub Create Issue",
      "description": "Create a new issue in a GitHub repository",
      "category": "developer-tools",
      "requires_auth": true,
      "input_schema": { ... }
    }
  ],
  "total_count": 123
}
```

## Implementation in Dashboard

### Server-Side (API Routes)

**File**: `app/api/tools/route.ts`

```typescript
import { getArcadeClient } from '../arcade';

const client = getArcadeClient();
const data = await client.get<any>('/v1/tools', { limit: 50 });

// Returns: { tools: [...], total_count: number }
```

### Client-Side (React)

**File**: `app/page.tsx`

```typescript
const response = await arcadeClient.listTools({ per_page: 1 });
// response.total contains the total_count
```

## Other Endpoints

**Note**: Many endpoints are not yet publicly documented. Check with Arcade team or inspect the engine repository for additional endpoints.

### Known Patterns:
- Tools: `/v1/tools`
- Toolkits: `/v1/toolkits` (likely)
- User: `/v1/user` (likely)
- Auth: `/v1/auth/*` (likely)

## Error Handling

```json
{
  "name": "route_not_found",
  "message": "requested route is not found or method is not allowed"
}
```

## Rate Limits

Check response headers for rate limit information.

## Support

- Documentation: https://docs.arcade.dev
- API Reference: https://docs.arcade.dev/en/references/api
- Discord: https://discord.gg/arcade

