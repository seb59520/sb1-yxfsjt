'use client';

import { Task } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  Calendar 
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { format, differenceInDays } from 'date-fns';
import { SPACE_TEXT_COLORS, SPACE_BORDER_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface SuggestionListProps {
  suggestions: any[];
  tasks: Task[];
  onTaskUpdate?: (task: Task) => void;
}

export function SuggestionList({ suggestions, tasks, onTaskUpdate }: SuggestionListProps) {
  const getRelatedTasks = (type: string) => {
    const today = new Date();
    switch (type) {
      case 'priority-reminder':
        return tasks.filter(task => 
          task.dueDate && 
          task.priority === 'high' && 
          task.status !== 'completed' &&
          differenceInDays(today, new Date(task.dueDate)) > 0
        );
      case 'workload-warning':
        return tasks.filter(task => 
          task.dueDate && 
          task.status !== 'completed' &&
          differenceInDays(new Date(task.dueDate), today) <= 3
        );
      case 'time-block':
        return tasks.filter(task => 
          !task.dueDate && 
          task.priority === 'high' &&
          task.status !== 'completed'
        );
      default:
        return [];
    }
  };

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
    <>
      {suggestions.map((suggestion, index) => {
        const relatedTasks = getRelatedTasks(suggestion.type);
        
        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Alert 
                  className={
                    suggestion.priority === 'high' 
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/50 cursor-help' 
                      : suggestion.priority === 'medium'
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 cursor-help'
                      : 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 cursor-help'
                  }
                >
                  <div className="flex items-start gap-2">
                    {suggestion.type === 'workload-warning' && (
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    )}
                    {suggestion.type === 'time-block' && (
                      <Clock className="h-5 w-5 text-emerald-500" />
                    )}
                    <div className="space-y-1">
                      <AlertTitle>
                        {suggestion.type === 'workload-warning' && 'Alerte de charge'}
                        {suggestion.type === 'time-block' && 'Suggestion de planification'}
                        {suggestion.type === 'priority-reminder' && 'Rappel de priorité'}
                      </AlertTitle>
                      <AlertDescription className="text-sm">
                        {suggestion.message}
                        {suggestion.suggestedAction && (
                          <div className="mt-2 flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {suggestion.suggestedAction.details}
                            </span>
                          </div>
                        )}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              </TooltipTrigger>
              <TooltipContent side="right" className="w-80 p-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Tâches concernées :</h4>
                  {relatedTasks.map(task => (
                    <div 
                      key={task.id} 
                      className={cn(
                        "p-3 rounded-lg border-2",
                        SPACE_BORDER_COLORS[task.space]
                      )}
                    >
                      <div className="space-y-2">
                        <h5 className={cn("font-medium", SPACE_TEXT_COLORS[task.space])}>
                          {task.title}
                        </h5>
                        {task.description && (
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                        )}
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
                    </div>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </>
  );
}