'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/calendar/calendar';
import { MarketingEventDialog } from './marketing-event-dialog';
import { MarketingEventList } from './marketing-event-list';
import { MarketingEvent } from '@/lib/types/marketing';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function MarketingCalendar() {
  const [events, setEvents] = useState<MarketingEvent[]>([]);

  const handleEventCreate = (newEvent: MarketingEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleEventUpdate = (updatedEvent: MarketingEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Marketing Calendar</h2>
        <MarketingEventDialog onEventCreate={handleEventCreate} />
      </div>

      <Tabs defaultValue="calendar">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <Calendar
            events={events.map((event) => ({
              ...event,
              space: 'professional',
            }))}
          />
        </TabsContent>
        <TabsContent value="list">
          <MarketingEventList
            events={events}
            onEventUpdate={handleEventUpdate}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}