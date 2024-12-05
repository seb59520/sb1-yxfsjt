'use client';

import { CalendarEvent, Holiday, SchoolVacation, Task } from '@/lib/types';
import { CalendarDay } from './calendar-day';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { Droppable } from '@hello-pangea/dnd';

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  tasks?: Task[];
  holidays: Holiday[];
  schoolVacations: SchoolVacation[];
}

export function CalendarGrid({ 
  currentDate, 
  events,
  tasks = [],
  holidays,
  schoolVacations 
}: CalendarGridProps) {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getTasksForDay = (date: Date) => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return format(taskDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="grid grid-cols-7 gap-px bg-border">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div
          key={day}
          className="bg-muted p-2 text-center text-sm font-medium"
        >
          {day}
        </div>
      ))}
      {days.map((day) => (
        <Droppable key={day.toISOString()} droppableId={day.toISOString()}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <CalendarDay
                date={day}
                events={getEventsForDay(day)}
                tasks={getTasksForDay(day)}
                holidays={holidays}
                schoolVacations={schoolVacations}
                isToday={isToday(day)}
                isDraggingOver={snapshot.isDraggingOver}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
}