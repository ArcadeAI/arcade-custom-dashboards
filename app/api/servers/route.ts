import { NextRequest, NextResponse } from 'next/server';
import { getMockServers } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = searchParams.get('page');
    const perPage = searchParams.get('per_page');

    const params: any = {};
    if (page) params.page = parseInt(page);
    if (perPage) params.per_page = parseInt(perPage);

    // TODO: Replace with real Arcade API call when endpoints are documented
    // const client = getArcadeClient();
    // const data = await client.get('/servers', params);
    
    const data = getMockServers(params);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch servers' },
      { status: error.status_code || 500 }
    );
  }
}

