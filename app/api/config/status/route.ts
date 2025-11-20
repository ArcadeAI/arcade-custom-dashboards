import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.ARCADE_API_KEY;
  const hasKey = !!apiKey && apiKey !== 'your_arcade_api_key_here';
  
  return NextResponse.json({ 
    configured: hasKey,
    message: hasKey ? 'API key configured' : 'API key not found in environment'
  });
}

