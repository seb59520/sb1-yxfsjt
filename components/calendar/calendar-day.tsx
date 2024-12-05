'use client';

import { CalendarEvent, Holiday, SchoolVacation, Task } from '@/lib/types';
import { CalendarEventItem } from './calendar-event';
import { TaskItem } from './task-item';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CalendarDayProps {
  date: Date;
  events: CalendarEvent[];
  tasks?: Task[];
  holidays?: Holiday[];
  schoolVacations?: SchoolVacation[];
  isToday?: boolean;
  isDraggingOver?: boolean;
}

export function CalendarDay({
  date,
  events,
  tasks = [],
  holidays = [],
  schoolVacations = [],
  isToday = false,
  isDraggingOver = false,
}: CalendarDayProps) {
  const isHoliday = holidays.some(
    (holiday) => holiday.date.toDateString() === date.toDateString()
  );

  const isSchoolVacation = schoolVacations.some(
    (vacation) =>
      date >= vacation.startDate && date <= vacation.endDate
  );

  // Check workload
  const HIGH_WORKLOAD_THRESHOLD = 3;
  const totalItems = events.length + tasks.length;
  const isHighWorkload = totalItems >= HIGH_WORKLOAD_THRESHOLD;

  return (
    <div
      className={cn(
        'min-h-[120px] p-2 border border-border relative transition-colors',
        isToday && 'bg-accent',
        isHoliday && 'bg-red-50 dark:bg-red-950/30',
        isSchoolVacation && 'bg-orange-50 dark:bg-orange-950/30',
        isDraggingOver && 'bg-accent/50'
      )}
    >
      <div className="font-medium text-sm mb-1 flex items-center justify-between">
        <span>{date.getDate()}</span>
        {isHighWorkload && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>High workload day ({totalItems} items)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {isHoliday && (
        <Badge variant="secondary" className="mb-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
          {holidays.find(h => h.date.toDateString() === date.toDateString())?.name}
        </Badge>
      )}
      {isSchoolVacation && (
        <Badge variant="secondary" className="mb-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
          School Vacation
        </Badge>
      )}
      <div className="space-y-1">
        {events.map((event) => (
          <CalendarEventItem key={event.id} event={event} />
        ))}
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}