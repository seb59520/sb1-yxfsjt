'use client';

import { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { CalendarHeader } from './calendar-header';
import { CalendarGrid } from './calendar-grid';
import { CalendarWeekView } from './calendar-week-view';
import { CalendarDayView } from './calendar-day-view';
import { TaskSidebar } from './task-sidebar';
import { AddItemDialog } from './add-item-dialog';
import { CalendarSyncButton } from './sync/calendar-sync-button';
import { CalendarSettingsDialog } from '@/components/settings/calendar-settings';
import { Card } from '@/components/ui/card';
import { CalendarEvent, Holiday, SchoolVacation, CalendarSettings, Task } from '@/lib/types';
import { getPublicHolidays, getSchoolVacations } from '@/lib/calendar/holidays';
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface CalendarProps {
  events: CalendarEvent[];
  tasks?: Task[];
  onEventCreate: (event: CalendarEvent) => void;
  onTaskUpdate?: (task: Task) => void;
}

export function Calendar({
  events,
  tasks = [],
  onEventCreate,
  onTaskUpdate,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');
  const [showSidebar, setShowSidebar] = useState(true);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [schoolVacations, setSchoolVacations] = useState<SchoolVacation[]>([]);
  const [settings, setSettings] = useState<CalendarSettings>({
    country: 'FR',
    schoolZone: 'A',
    showPublicHolidays: true,
    showSchoolVacations: true,
  });

  useEffect(() => {
    const fetchHolidays = async () => {
      if (settings.showPublicHolidays) {
        const data = await getPublicHolidays(settings.country, currentDate.getFullYear());
        setHolidays(data);
      }
    };

    const fetchVacations = async () => {
      if (settings.showSchoolVacations && settings.schoolZone) {
        const data = await getSchoolVacations(
          settings.country,
          settings.schoolZone,
          currentDate.getFullYear()
        );
        setSchoolVacations(data);
      }
    };

    fetchHolidays();
    fetchVacations();
  }, [settings, currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleSettingsChange = (newSettings: CalendarSettings) => {
    setSettings(newSettings);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination || !onTaskUpdate) return;

    const taskId = result.draggableId;
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newDate = new Date(result.destination.droppableId);
    onTaskUpdate({
      ...task,
      dueDate: newDate,
      updatedAt: new Date(),
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <CalendarHeader
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onViewChange={setCurrentView}
              currentView={currentView}
              onToggleSidebar={() => setShowSidebar(!showSidebar)}
              showSidebar={showSidebar}
            />
            <CalendarSyncButton />
          </div>
          <div className="flex items-center space-x-2">
            <AddItemDialog onEventCreate={onEventCreate} onTaskCreate={onTaskUpdate || (() => {})} />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Calendar Settings</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <CalendarSettingsDialog
                    settings={settings}
                    onSettingsChange={handleSettingsChange}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-4">
          {showSidebar && tasks && (
            <div className="w-64">
              <TaskSidebar tasks={tasks} />
            </div>
          )}
          <div className="flex-1">
            {currentView === 'month' && (
              <CalendarGrid
                currentDate={currentDate}
                events={events}
                tasks={tasks}
                holidays={holidays}
                schoolVacations={schoolVacations}
              />
            )}
            {currentView === 'week' && (
              <CalendarWeekView
                currentDate={currentDate}
                events={events}
              />
            )}
            {currentView === 'day' && (
              <CalendarDayView
                currentDate={currentDate}
                events={events}
              />
            )}
          </div>
        </div>
      </Card>
    </DragDropContext>
  );
}