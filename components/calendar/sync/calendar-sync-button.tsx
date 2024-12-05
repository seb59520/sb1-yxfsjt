'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CalendarDays, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CALENDAR_PROVIDERS = [
  {
    id: 'google',
    name: 'Google Calendar',
    authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/calendar.readonly&access_type=offline`,
  },
  {
    id: 'outlook',
    name: 'Outlook Calendar',
    authUrl: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=Calendars.Read`,
  },
];

export function CalendarSyncButton() {
  const [syncing, setSyncing] = useState(false);
  const [connectedProviders, setConnectedProviders] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSync = async (providerId: string) => {
    setSyncing(true);
    try {
      // Store the provider ID in localStorage before redirecting
      localStorage.setItem('selectedCalendarProvider', providerId);
      
      // Find the provider and redirect to its auth URL
      const provider = CALENDAR_PROVIDERS.find(p => p.id === providerId);
      if (provider) {
        window.location.href = provider.authUrl;
      }
    } catch (error) {
      console.error('Error syncing calendar:', error);
      toast({
        title: 'Error',
        description: 'Failed to sync calendar. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={syncing}>
          {syncing ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <CalendarDays className="w-4 h-4 mr-2" />
          )}
          Sync Calendar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {CALENDAR_PROVIDERS.map((provider) => (
          <DropdownMenuItem
            key={provider.id}
            onClick={() => handleSync(provider.id)}
            disabled={syncing}
          >
            <span className="flex items-center">
              {provider.name}
              {connectedProviders.includes(provider.id) && (
                <Check className="w-4 h-4 ml-2 text-green-500" />
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}