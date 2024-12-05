'use client';

import { Task } from '@/lib/types';
import { SPACE_COLORS, SPACE_BORDER_COLORS, SPACE_TEXT_COLORS, SPACE_BACKGROUND_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onTaskUpdate: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-emerald-600 text-white dark:bg-emerald-500',
  medium: 'bg-amber-600 text-white dark:bg-amber-500',
  high: 'bg-red-600 text-white dark:bg-red-500',
};

const statusProgress = {
  todo: 0,
  'in-progress': 50,
  completed: 100,
};

const statusIcons = {
  todo: null,
  'in-progress': null,
  completed: CheckCircle2,
};

export function TaskItem({ task, onTaskUpdate }: TaskItemProps) {
  const handleStatusChange = () => {
    const nextStatus = {
      todo: 'in-progress',
      'in-progress': 'completed',
      completed: 'todo',
    }[task.status] as Task['status'];

    onTaskUpdate({
      ...task,
      status: nextStatus,
      updatedAt: new Date(),
    });
  };

  const StatusIcon = statusIcons[task.status];
  const daysRemaining = task.dueDate ? differenceInDays(new Date(task.dueDate), new Date()) : null;
  const isUrgent = daysRemaining !== null && daysRemaining <= 3 && task.status !== 'completed';

  return (
    <div className={cn(
      'p-4 rounded-lg border-2 shadow-sm transition-colors',
      SPACE_BORDER_COLORS[task.space],
      SPACE_BACKGROUND_COLORS[task.space],
      task.status === 'completed' && 'opacity-75'
    )}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h4 className={cn(
                'font-medium',
                SPACE_TEXT_COLORS[task.space],
                task.status === 'completed' && 'line-through'
              )}>
                {task.title}
              </h4>
              <Badge
                variant="secondary"
                className={cn('text-white font-medium', SPACE_COLORS[task.space])}
              >
                {task.space}
              </Badge>
              <Badge
                variant="secondary"
                className={cn('font-medium', priorityColors[task.priority])}
              >
                {task.priority}
              </Badge>
            </div>
            {task.description && (
              <p className="text-sm text-muted-foreground">{task.description}</p>
            )}
            {task.dueDate && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(task.dueDate), 'PPP')}
                </div>
                {isUrgent && (
                  <div className="flex items-center text-amber-500">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {daysRemaining === 0 ? "Aujourd'hui" : 
                     daysRemaining === 1 ? "Demain" : 
                     `${daysRemaining} jours restants`}
                  </div>
                )}
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleStatusChange}
            className={cn(
              'font-medium border-2 transition-colors',
              SPACE_TEXT_COLORS[task.space],
              SPACE_BORDER_COLORS[task.space],
              'hover:bg-secondary'
            )}
          >
            {StatusIcon && <StatusIcon className="w-4 h-4 mr-2" />}
            {task.status}
          </Button>
        </div>
        <Progress value={statusProgress[task.status]} className="h-2" />
      </div>
    </div>
  );
}