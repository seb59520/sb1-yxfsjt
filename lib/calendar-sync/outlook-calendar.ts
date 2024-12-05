import { Client } from '@microsoft/microsoft-graph-client';
import { CalendarEvent } from '@/lib/types';

export async function getOutlookCalendarEvents(accessToken: string): Promise<CalendarEvent[]> {
  const client = Client.init({
    authProvider: (done) => done(null, accessToken),
  });

  try {
    const response = await client
      .api('/me/calendar/events')
      .select('subject,body,start,end,isAllDay')
      .orderby('start/dateTime')
      .get();

    return response.value.map((event: any) => ({
      id: event.id,
      title: event.subject,
      description: event.body?.content || '',
      startDate: new Date(event.start.dateTime),
      endDate: new Date(event.end.dateTime),
      allDay: event.isAllDay,
      space: 'professional',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  } catch (error) {
    console.error('Error fetching Outlook Calendar events:', error);
    throw error;
  }
}

export async function addOutlookCalendarEvent(accessToken: string, event: CalendarEvent) {
  const client = Client.init({
    authProvider: (done) => done(null, accessToken),
  });

  try {
    await client.api('/me/calendar/events').post({
      subject: event.title,
      body: {
        contentType: 'text',
        content: event.description,
      },
      start: {
        dateTime: event.startDate.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: event.endDate.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      isAllDay: event.allDay,
    });
  } catch (error) {
    console.error('Error adding Outlook Calendar event:', error);
    throw error;
  }
}