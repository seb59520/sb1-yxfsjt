'use client';

import { Task } from '@/lib/types';
import { TaskItem } from './task-item';
import { Card } from '@/components/ui/card';
import { TaskDialog } from './task-dialog';
import { useState } from 'react';
import { TaskFilter } from './task-filter';

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    description: 'Write and submit the Q2 project proposal',
    space: 'professional',
    priority: 'high',
    status: 'in-progress',
    dueDate: new Date(2024, 3, 20),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Gym Workout',
    description: 'Complete weekly workout routine',
    space: 'personal',
    priority: 'medium',
    status: 'todo',
    dueDate: new Date(2024, 3, 18),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [filter, setFilter] = useState<{
    space?: string;
    status?: string;
  }>({});

  const filteredTasks = tasks.filter((task) => {
    if (filter.space && task.space !== filter.space) return false;
    if (filter.status && task.status !== filter.status) return false;
    return true;
  });

  const handleTaskCreate = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Tasks</h3>
        <TaskDialog onTaskCreate={handleTaskCreate} />
      </div>
      <TaskFilter
        currentFilter={filter}
        onFilterChange={setFilter}
      />
      <div className="space-y-2 mt-4">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onTaskUpdate={handleTaskUpdate}
          />
        ))}
      </div>
    </Card>
  );
}