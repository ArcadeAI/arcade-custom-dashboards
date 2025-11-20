import { NextRequest, NextResponse } from 'next/server';
import { getArcadeClient } from '../arcade';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Extract query parameters
    const limit = searchParams.get('per_page') || searchParams.get('limit');
    const toolkit = searchParams.get('toolkit');
    const query = searchParams.get('q');

    const params: any = {};
    if (limit) params.limit = parseInt(limit);
    if (toolkit) params.toolkit = toolkit;
    // Note: q param can interfere with count, so only add if specified

    const client = getArcadeClient();
    const data = await client.get<any>('/v1/tools', params);

    // Transform Arcade API response to our format
    // Arcade API returns: { items: [...], total_count: number }
    const tools = (data.items || []).map((item: any) => ({
      id: item.fully_qualified_name || item.name,
      name: item.name,
      description: item.description,
      category: item.toolkit?.name || 'uncategorized',
      server_id: item.toolkit?.name,
      requires_auth: item.requirements?.authorization?.status === 'active',
      input_schema: item.input,
      created_at: new Date().toISOString(),
    }));

    return NextResponse.json({
      data: tools,
      total: data.total_count || 0,
      page: 1,
      per_page: parseInt(limit || '50'),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch tools' },
      { status: error.status_code || 500 }
    );
  }
}

