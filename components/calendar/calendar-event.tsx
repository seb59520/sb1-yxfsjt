'use client';

import { CalendarEvent } from '@/lib/types';
import { SPACE_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';

interface CalendarEventProps {
  event: CalendarEvent;
}

export function CalendarEventItem({ event }: CalendarEventProps) {
  const formatTime = (date: Date) => format(date, 'HH:mm');
  const formatDate = (date: Date) => format(date, 'PPP');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'px-2 py-1 rounded text-white text-sm truncate shadow-sm transition-colors cursor-pointer',
              SPACE_COLORS[event.space]
            )}
          >
            {event.title}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="w-80">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-lg">{event.title}</h4>
              {event.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {event.description}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {event.allDay ? (
                    formatDate(event.startDate)
                  ) : (
                    <>
                      {formatDate(event.startDate)} • {formatTime(event.startDate)} - {formatTime(event.endDate)}
                    </>
                  )}
                </span>
              </div>

              {event.location && (
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              )}

              {event.attendees && event.attendees.length > 0 && (
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{event.attendees.length} participants</span>
                </div>
              )}

              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>
                  {event.allDay ? (
                    'Toute la journée'
                  ) : (
                    `${formatTime(event.startDate)} - ${formatTime(event.endDate)}`
                  )}
                </span>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}