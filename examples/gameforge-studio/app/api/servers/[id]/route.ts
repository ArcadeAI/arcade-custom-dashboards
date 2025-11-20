import { NextRequest, NextResponse } from 'next/server';
import { mockServers } from '@/lib/mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // TODO: Replace with real Arcade API call when endpoints are documented
    // const client = getArcadeClient();
    // const data = await client.get(`/servers/${id}`);

    const server = mockServers.find(s => s.id === id);
    
    if (!server) {
      return NextResponse.json(
        { error: 'Server not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(server);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch server' },
      { status: error.status_code || 500 }
    );
  }
}

