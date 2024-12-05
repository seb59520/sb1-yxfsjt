'use client';

import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format, addMonths, subMonths, startOfYear, endOfYear } from 'date-fns';

interface CalendarNavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onViewChange: (view: 'month' | 'week' | 'day') => void;
  currentView: 'month' | 'week' | 'day';
}

export function CalendarNavigation({
  currentDate,
  onDateChange,
  onViewChange,
  currentView,
}: CalendarNavigationProps) {
  const handlePrevMonth = () => onDateChange(subMonths(currentDate, 1));
  const handleNextMonth = () => onDateChange(addMonths(currentDate, 1));
  const handleStartOfYear = () => onDateChange(startOfYear(currentDate));
  const handleEndOfYear = () => onDateChange(endOfYear(currentDate));

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={handleStartOfYear}
            className="h-8 w-8 border-amber-500"
          >
            <ChevronsLeft className="h-4 w-4 text-amber-700" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevMonth}
            className="h-8 w-8 border-amber-500"
          >
            <ChevronLeft className="h-4 w-4 text-amber-700" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextMonth}
            className="h-8 w-8 border-amber-500"
          >
            <ChevronRight className="h-4 w-4 text-amber-700" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleEndOfYear}
            className="h-8 w-8 border-amber-500"
          >
            <ChevronsRight className="h-4 w-4 text-amber-700" />
          </Button>
        </div>
      </div>
      <Select value={currentView} onValueChange={onViewChange}>
        <SelectTrigger className="w-[120px] border-amber-500">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="month">Month</SelectItem>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="day">Day</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}