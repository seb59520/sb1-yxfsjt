'use client';

import { ActivitySpaces } from '@/components/activity-spaces';
import { Calendar } from '@/components/calendar/calendar';
import { TaskBoard } from '@/components/tasks/task-board';
import { LevelProgress } from '@/components/gamification/level-progress';
import { SpaceSelector } from '@/components/space-selector';
import { TaskSuggestions } from '@/components/ai/task-suggestions';
import { useState } from 'react';
import { Task, ActivitySpace, CalendarEvent } from '@/lib/types';
import { SAMPLE_EVENTS } from '@/lib/calendar/sample-events';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Proposition de projet',
    description: 'Rédiger et soumettre la proposition de projet Q2',
    space: 'professional',
    priority: 'high',
    status: 'in-progress',
    dueDate: new Date(2024, 3, 20),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Séance de sport',
    description: 'Compléter la routine hebdomadaire',
    space: 'personal',
    priority: 'medium',
    status: 'todo',
    dueDate: new Date(2024, 3, 18),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [events, setEvents] = useState<CalendarEvent[]>(SAMPLE_EVENTS);
  const [selectedSpace, setSelectedSpace] = useState<ActivitySpace | 'all'>('all');

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleEventCreate = (newEvent: CalendarEvent) => {
    setEvents(prev => [...prev, newEvent]);
  };

  const filteredTasks = selectedSpace === 'all' 
    ? tasks 
    : tasks.filter(task => task.space === selectedSpace);

  const filteredEvents = selectedSpace === 'all'
    ? events
    : events.filter(event => event.space === selectedSpace);

  return (
    <main className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
      </div>
      
      <SpaceSelector 
        selectedSpace={selectedSpace}
        onSpaceChange={setSelectedSpace}
      />
      
      <div className="grid gap-6 grid-cols-12">
        <div className="col-span-12 lg:col-span-9">
          <div className="grid gap-6 grid-cols-3">
            <ActivitySpaces tasks={filteredTasks} onTaskUpdate={handleTaskUpdate} />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <LevelProgress stats={{
            tasksCompleted: 25,
            streakDays: 5,
            level: 3,
            experience: 750,
            nextLevelExperience: 1000,
            achievements: []
          }} />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-12">
        <div className="col-span-12 lg:col-span-9">
          <TaskSuggestions tasks={filteredTasks} onTaskUpdate={handleTaskUpdate} />
        </div>
      </div>
      
      <div className="grid gap-6">
        <Calendar 
          events={filteredEvents}
          tasks={filteredTasks}
          onEventCreate={handleEventCreate}
          onTaskUpdate={handleTaskUpdate}
        />
      </div>

      <TaskBoard
        tasks={filteredTasks}
        onTaskUpdate={handleTaskUpdate}
      />
    </main>
  );
}