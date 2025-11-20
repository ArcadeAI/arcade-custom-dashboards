import { NextResponse } from 'next/server';
import { mockAuthStatus } from '@/lib/mock-data';

export async function GET() {
  try {
    // TODO: Replace with real Arcade API call when endpoints are documented
    // const client = getArcadeClient();
    // const data = await client.get('/auth/status');
    
    const data = mockAuthStatus;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch auth status' },
      { status: error.status_code || 500 }
    );
  }
}

