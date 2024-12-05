import { Task, ActivitySpace } from '@/lib/types';
import { differenceInDays, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

interface TaskSuggestion {
  type: 'time-block' | 'priority-reminder' | 'workload-warning';
  message: string;
  priority: 'low' | 'medium' | 'high';
  suggestedAction?: {
    type: 'reschedule' | 'delegate' | 'break-down';
    details: string;
  };
}

export function analyzeWorkload(tasks: Task[]): TaskSuggestion[] {
  const suggestions: TaskSuggestion[] = [];
  const today = new Date();

  // Check for overdue high-priority tasks
  const overdueTasks = tasks.filter(task => 
    task.dueDate && 
    task.priority === 'high' && 
    task.status !== 'completed' &&
    differenceInDays(today, new Date(task.dueDate)) > 0
  );

  if (overdueTasks.length > 0) {
    suggestions.push({
      type: 'priority-reminder',
      message: `Vous avez ${overdueTasks.length} tâche(s) prioritaire(s) en retard qui nécessitent votre attention immédiate.`,
      priority: 'high',
      suggestedAction: {
        type: 'reschedule',
        details: 'Considérez de replanifier ces tâches pour aujourd\'hui ou demain'
      }
    });
  }

  // Analyze daily workload
  const tasksPerDay = tasks.reduce((acc, task) => {
    if (task.dueDate) {
      const date = startOfDay(new Date(task.dueDate)).toISOString();
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  Object.entries(tasksPerDay).forEach(([date, count]) => {
    if (count > 5) {
      suggestions.push({
        type: 'workload-warning',
        message: `Surcharge détectée le ${new Date(date).toLocaleDateString()}: ${count} tâches prévues.`,
        priority: 'medium',
        suggestedAction: {
          type: 'break-down',
          details: 'Envisagez de répartir les tâches sur plusieurs jours'
        }
      });
    }
  });

  // Suggest optimal time blocks
  const unscheduledHighPriorityTasks = tasks.filter(task => 
    !task.dueDate && 
    task.priority === 'high' &&
    task.status !== 'completed'
  );

  if (unscheduledHighPriorityTasks.length > 0) {
    suggestions.push({
      type: 'time-block',
      message: 'Tâches prioritaires non planifiées détectées. Suggestion de créneaux optimaux :',
      priority: 'medium',
      suggestedAction: {
        type: 'delegate',
        details: 'Planifiez ces tâches pendant vos heures les plus productives (9h-11h)'
      }
    });
  }

  return suggestions;
}

export function suggestTaskOptimizations(tasks: Task[]): string[] {
  const suggestions: string[] = [];
  const today = new Date();

  // Group similar tasks
  const tasksBySpace = tasks.reduce((acc, task) => {
    acc[task.space] = acc[task.space] || [];
    acc[task.space].push(task);
    return acc;
  }, {} as Record<ActivitySpace, Task[]>);

  Object.entries(tasksBySpace).forEach(([space, spaceTasks]) => {
    if (spaceTasks.length >= 3) {
      suggestions.push(
        `Optimisation possible : Regroupez les ${spaceTasks.length} tâches ${space} pour une meilleure efficacité.`
      );
    }
  });

  // Identify task dependencies and suggest optimal ordering
  const highPriorityTasks = tasks.filter(task => task.priority === 'high');
  if (highPriorityTasks.length > 1) {
    suggestions.push(
      'Suggestion : Établissez un ordre de priorité clair entre vos tâches importantes.'
    );
  }

  return suggestions;
}

export function calculateOptimalSchedule(tasks: Task[]): Map<string, Task[]> {
  const schedule = new Map<string, Task[]>();
  const today = new Date();
  const maxTasksPerDay = 5;

  // Sort tasks by priority and due date
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.priority === 'high' && b.priority !== 'high') return -1;
    if (a.priority !== 'high' && b.priority === 'high') return 1;
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  // Distribute tasks across days
  let currentDate = startOfDay(today);
  let currentDayTasks: Task[] = [];

  sortedTasks.forEach(task => {
    if (currentDayTasks.length >= maxTasksPerDay) {
      schedule.set(currentDate.toISOString(), currentDayTasks);
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      currentDayTasks = [];
    }
    currentDayTasks.push(task);
  });

  if (currentDayTasks.length > 0) {
    schedule.set(currentDate.toISOString(), currentDayTasks);
  }

  return schedule;
}