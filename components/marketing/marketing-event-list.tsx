'use client';

import { MarketingEvent } from '@/lib/types/marketing';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';

interface MarketingEventListProps {
  events: MarketingEvent[];
  onEventUpdate: (event: MarketingEvent) => void;
}

const statusColors = {
  planned: 'bg-blue-500 text-white',
  'in-progress': 'bg-amber-500 text-white',
  completed: 'bg-green-500 text-white',
  cancelled: 'bg-red-500 text-white',
};

export function MarketingEventList({ events, onEventUpdate }: MarketingEventListProps) {
  const handleStatusChange = (event: MarketingEvent) => {
    const nextStatus = {
      planned: 'in-progress',
      'in-progress': 'completed',
      completed: 'cancelled',
      cancelled: 'planned',
    }[event.status] as MarketingEvent['status'];

    onEventUpdate({
      ...event,
      status: nextStatus,
      updatedAt: new Date(),
    });
  };

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium">{event.title}</h4>
                <Badge variant="secondary" className={statusColors[event.status]}>
                  {event.status}
                </Badge>
                <Badge variant="outline">{event.type}</Badge>
              </div>
              {event.description && (
                <p className="text-sm text-muted-foreground">{event.description}</p>
              )}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(event.startDate), 'PPp')}
                </div>
                {event.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.location.city}
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange(event)}
            >
              Change Status
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}