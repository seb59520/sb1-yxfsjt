export interface CalendarProvider {
  id: 'google' | 'outlook' | 'icloud';
  name: string;
  icon: string;
  authUrl: string;
}

export interface ExternalCalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
  location?: string;
  attendees?: string[];
  source: CalendarProvider['id'];
}

export interface SyncStatus {
  lastSync: Date | null;
  error?: string;
  syncing: boolean;
}