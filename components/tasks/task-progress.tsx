'use client';

import { Task } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { Calendar } from 'lucide-react';
import { differenceInDays } from 'date-fns';

interface TaskProgressProps {
  task: Task;
}

export function TaskProgress({ task }: TaskProgressProps) {
  const calculateProgress = (task: Task) => {
    switch (task.status) {
      case 'completed': return 100;
      case 'in-progress': return 50;
      case 'todo': return 0;
    }
  };

  const getRemainingDays = (task: Task) => {
    if (!task.dueDate) return null;
    const daysRemaining = differenceInDays(new Date(task.dueDate), new Date());
    if (daysRemaining === 0) return "Aujourd'hui";
    if (daysRemaining === 1) return "Demain";
    if (daysRemaining < 0) return `En retard de ${Math.abs(daysRemaining)} jours`;
    return `${daysRemaining} jours restants`;
  };

  return (
    <div className="px-4 space-y-2">
      {task.dueDate && (
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{getRemainingDays(task)}</span>
        </div>
      )}
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progression</span>
          <span>{calculateProgress(task)}%</span>
        </div>
        <Progress value={calculateProgress(task)} className="h-2" />
      </div>
    </div>
  );
}