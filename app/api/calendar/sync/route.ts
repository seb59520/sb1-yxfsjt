import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getGoogleCalendarEvents } from '@/lib/calendar-sync/google-calendar';
import { getOutlookCalendarEvents } from '@/lib/calendar-sync/outlook-calendar';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const provider = searchParams.get('provider');

  if (!code || !provider) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  try {
    const events = await fetchCalendarEvents(provider, code);
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Calendar sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync calendar' },
      { status: 500 }
    );
  }
}

async function fetchCalendarEvents(provider: string, code: string) {
  switch (provider) {
    case 'google':
      return getGoogleCalendarEvents(code);
    case 'outlook':
      return getOutlookCalendarEvents(code);
    default:
      throw new Error(`Unsupported calendar provider: ${provider}`);
  }
}