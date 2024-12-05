'use client';

import { CalendarEvent } from '@/lib/types';
import { CalendarEventItem } from './calendar-event';
import { startOfWeek, addDays, format } from 'date-fns';

interface CalendarWeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
}

export function CalendarWeekView({ currentDate, events }: CalendarWeekViewProps) {
  const weekStart = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getEventsForDay = (date: Date) =>
    events.filter(
      (event) =>
        format(new Date(event.startDate), 'yyyy-MM-dd') ===
        format(date, 'yyyy-MM-dd')
    );

  return (
    <div className="grid grid-cols-7 gap-px bg-border">
      {weekDays.map((day) => (
        <div
          key={day.toISOString()}
          className="min-h-[200px] p-2 bg-background"
        >
          <div className="font-medium text-sm mb-2">
            {format(day, 'EEE d')}
          </div>
          <div className="space-y-1">
            {getEventsForDay(day).map((event) => (
              <CalendarEventItem key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}