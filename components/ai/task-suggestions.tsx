'use client';

import { Task } from '@/lib/types';
import { analyzeWorkload, suggestTaskOptimizations } from '@/lib/ai/task-assistant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Lightbulb } from 'lucide-react';
import { SuggestionList } from './suggestion-list';
import { OptimizationList } from './optimization-list';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TaskSuggestionsProps {
  tasks: Task[];
  onTaskUpdate?: (task: Task) => void;
}

export function TaskSuggestions({ tasks, onTaskUpdate }: TaskSuggestionsProps) {
  const suggestions = analyzeWorkload(tasks);
  const optimizations = suggestTaskOptimizations(tasks);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-amber-500" />
          Assistant IA
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Lightbulb className="w-4 h-4 text-amber-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>L'assistant IA analyse vos tâches et propose des suggestions d'optimisation basées sur votre charge de travail et vos priorités.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SuggestionList 
          suggestions={suggestions} 
          tasks={tasks} 
          onTaskUpdate={onTaskUpdate} 
        />
        <OptimizationList optimizations={optimizations} />
      </CardContent>
    </Card>
  );
}