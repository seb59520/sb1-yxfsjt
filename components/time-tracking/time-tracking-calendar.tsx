'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { WorkDay } from '@/lib/types/timesheet';

export function TimeTrackingCalendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [workDays, setWorkDays] = useState<WorkDay[]>([]);

  const modifiers = {
    overtime: new Date('2024-03-15'),
    undertime: new Date('2024-03-10'),
  };

  const modifiersStyles = {
    overtime: {
      color: 'white',
      backgroundColor: '#f59e0b',
    },
    undertime: {
      color: 'white',
      backgroundColor: '#ef4444',
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-300">
          {format(date, 'MMMM yyyy')}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950"
            onClick={() => setDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
          >
            <ChevronLeft className="h-4 w-4 text-amber-700 dark:text-amber-300" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950"
            onClick={() => setDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
          >
            <ChevronRight className="h-4 w-4 text-amber-700 dark:text-amber-300" />
          </Button>
        </div>
      </div>

      <Calendar
        mode="single"
        selected={date}
        onSelect={(newDate) => newDate && setDate(newDate)}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        className="rounded-md border-2 border-amber-500"
      />

      <div className="flex items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-amber-700 dark:text-amber-300">Overtime</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-red-700 dark:text-red-300">Undertime</span>
        </div>
      </div>
    </div>
  );
}