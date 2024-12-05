'use client';

import { CalendarEvent } from '@/lib/types';
import { CalendarEventItem } from './calendar-event';
import { format } from 'date-fns';

interface CalendarDayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
}

export function CalendarDayView({ currentDate, events }: CalendarDayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const getEventsForHour = (hour: number) =>
    events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return (
        format(eventDate, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd') &&
        eventDate.getHours() === hour
      );
    });

  return (
    <div className="space-y-1">
      {hours.map((hour) => (
        <div
          key={hour}
          className="grid grid-cols-[100px_1fr] border-b border-border"
        >
          <div className="p-2 text-sm text-muted-foreground">
            {format(new Date().setHours(hour), 'ha')}
          </div>
          <div className="p-2 min-h-[60px]">
            {getEventsForHour(hour).map((event) => (
              <CalendarEventItem key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}