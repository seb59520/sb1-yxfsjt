'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Task } from '@/lib/types';
import { TaskItem } from './task-item';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SPACE_TEXT_COLORS, SPACE_BORDER_COLORS, SPACE_BACKGROUND_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Info, Plus, Calendar } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AddItemDialog } from '../calendar/add-item-dialog';
import { differenceInDays } from 'date-fns';
import { TaskProgress } from './task-progress';
import { TaskWorkload } from './task-workload';

interface TaskDetailsDialogProps {
  space: 'professional' | 'personal' | 'associative';
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
}

export function TaskDetailsDialog({ space, tasks, onTaskUpdate }: TaskDetailsDialogProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className={cn(
            "flex flex-col items-center p-4",
            SPACE_BORDER_COLORS[space],
            SPACE_BACKGROUND_COLORS[space],
            SPACE_TEXT_COLORS[space]
          )}
        >
          <span className="text-2xl font-bold">{totalTasks}</span>
          <span className="text-sm">Tâches actives</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className={cn("text-xl", SPACE_TEXT_COLORS[space])}>
              Détails des tâches
            </DialogTitle>
            <div className="flex items-center gap-2">
              <TaskWorkload
                totalTasks={totalTasks}
                todoTasks={todoTasks}
                inProgressTasks={inProgressTasks}
                completedTasks={completedTasks}
              />
              <AddItemDialog 
                onTaskCreate={onTaskUpdate}
                onEventCreate={() => {}}
              />
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          {tasks.length > 0 ? (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="space-y-2">
                  <TaskItem
                    task={task}
                    onTaskUpdate={onTaskUpdate}
                  />
                  <TaskProgress task={task} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Aucune tâche à afficher
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}