import { CalendarProvider } from './types';

export const CALENDAR_PROVIDERS: CalendarProvider[] = [
  {
    id: 'google',
    name: 'Google Calendar',
    icon: 'google',
    authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/calendar.readonly&access_type=offline`,
  },
  {
    id: 'outlook',
    name: 'Outlook Calendar',
    icon: 'microsoft',
    authUrl: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=Calendars.Read`,
  },
  {
    id: 'icloud',
    name: 'iCloud Calendar',
    icon: 'apple',
    authUrl: `https://appleid.apple.com/auth/authorize?client_id=${process.env.NEXT_PUBLIC_APPLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=calendar`,
  },
];