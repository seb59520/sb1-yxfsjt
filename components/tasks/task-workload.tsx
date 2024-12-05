'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface TaskWorkloadProps {
  totalTasks: number;
  todoTasks: number;
  inProgressTasks: number;
  completedTasks: number;
}

export function TaskWorkload({
  totalTasks,
  todoTasks,
  inProgressTasks,
  completedTasks,
}: TaskWorkloadProps) {
  const getWorkloadStatus = () => {
    if (totalTasks >= 15) return 'Élevée';
    if (totalTasks >= 8) return 'Modérée';
    return 'Normale';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="w-80">
          <div className="space-y-2">
            <p className="font-medium">Charge de travail: {getWorkloadStatus()}</p>
            <div className="text-sm">
              <p>• À faire: {todoTasks} tâches</p>
              <p>• En cours: {inProgressTasks} tâches</p>
              <p>• Terminées: {completedTasks} tâches</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}