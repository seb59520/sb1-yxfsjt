'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TimeEntry, WorkDay } from '@/lib/types/timesheet';
import { format } from 'date-fns';
import { 
  Clock, 
  PlayCircle, 
  StopCircle, 
  Coffee, 
  ArrowRightCircle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TimeClockProps {
  onStatusChange?: (status: 'working' | 'break' | 'off') => void;
}

export function TimeClock({ onStatusChange }: TimeClockProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [workStatus, setWorkStatus] = useState<'working' | 'break' | 'off'>('off');
  const [currentWorkDay, setCurrentWorkDay] = useState<WorkDay | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    const entry: TimeEntry = {
      id: crypto.randomUUID(),
      type: 'check-in',
      timestamp: new Date(),
    };

    const newWorkDay: WorkDay = {
      id: crypto.randomUUID(),
      date: new Date(),
      entries: [entry],
      totalWorkTime: 0,
      totalBreakTime: 0,
      status: 'in-progress',
    };

    setCurrentWorkDay(newWorkDay);
    setWorkStatus('working');
    onStatusChange?.('working');

    toast({
      title: "Checked In",
      description: `Work day started at ${format(new Date(), 'HH:mm')}`,
    });
  };

  const handleCheckOut = () => {
    if (!currentWorkDay) return;

    const entry: TimeEntry = {
      id: crypto.randomUUID(),
      type: 'check-out',
      timestamp: new Date(),
    };

    setCurrentWorkDay(prev => {
      if (!prev) return null;
      return {
        ...prev,
        entries: [...prev.entries, entry],
        status: 'completed',
      };
    });

    setWorkStatus('off');
    onStatusChange?.('off');

    toast({
      title: "Checked Out",
      description: `Work day ended at ${format(new Date(), 'HH:mm')}`,
    });
  };

  const handleBreakStart = () => {
    if (!currentWorkDay) return;

    const entry: TimeEntry = {
      id: crypto.randomUUID(),
      type: 'break-start',
      timestamp: new Date(),
    };

    setCurrentWorkDay(prev => {
      if (!prev) return null;
      return {
        ...prev,
        entries: [...prev.entries, entry],
      };
    });

    setWorkStatus('break');
    onStatusChange?.('break');

    toast({
      title: "Break Started",
      description: `Break started at ${format(new Date(), 'HH:mm')}`,
    });
  };

  const handleBreakEnd = () => {
    if (!currentWorkDay) return;

    const entry: TimeEntry = {
      id: crypto.randomUUID(),
      type: 'break-end',
      timestamp: new Date(),
    };

    setCurrentWorkDay(prev => {
      if (!prev) return null;
      return {
        ...prev,
        entries: [...prev.entries, entry],
      };
    });

    setWorkStatus('working');
    onStatusChange?.('working');

    toast({
      title: "Break Ended",
      description: `Break ended at ${format(new Date(), 'HH:mm')}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className={
            workStatus === 'working' ? 'bg-amber-100 dark:bg-amber-900 border-amber-500' :
            workStatus === 'break' ? 'bg-amber-100 dark:bg-amber-900 border-amber-500' :
            'border-amber-500'
          }
        >
          {workStatus === 'working' ? (
            <PlayCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          ) : workStatus === 'break' ? (
            <Coffee className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          ) : (
            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5 text-sm font-semibold text-amber-700 dark:text-amber-300">
          {format(currentTime, 'HH:mm:ss')}
        </div>
        {workStatus === 'off' && (
          <DropdownMenuItem onClick={handleCheckIn}>
            <PlayCircle className="mr-2 h-4 w-4" />
            Check In
          </DropdownMenuItem>
        )}
        {workStatus === 'working' && (
          <>
            <DropdownMenuItem onClick={handleBreakStart}>
              <Coffee className="mr-2 h-4 w-4" />
              Start Break
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCheckOut}>
              <StopCircle className="mr-2 h-4 w-4" />
              Check Out
            </DropdownMenuItem>
          </>
        )}
        {workStatus === 'break' && (
          <DropdownMenuItem onClick={handleBreakEnd}>
            <ArrowRightCircle className="mr-2 h-4 w-4" />
            End Break
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}