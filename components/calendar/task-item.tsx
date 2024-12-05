'use client';

import { Task } from '@/lib/types';
import { SPACE_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  return (
    <div
      className={cn(
        'px-2 py-1 rounded text-white text-sm truncate shadow-sm transition-colors',
        SPACE_COLORS[task.space]
      )}
    >
      {task.title}
    </div>
  );
}