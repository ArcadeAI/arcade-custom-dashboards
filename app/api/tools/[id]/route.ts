import { NextRequest, NextResponse } from 'next/server';
import { mockTools } from '@/lib/mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // TODO: Replace with real Arcade API call when endpoints are documented
    // const client = getArcadeClient();
    // const data = await client.get(`/tools/${id}`);

    const tool = mockTools.find(t => t.id === id);
    
    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(tool);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch tool' },
      { status: error.status_code || 500 }
    );
  }
}

