'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SPACE_COLORS, SPACE_NAMES } from '@/lib/constants';
import { ActivitySpace, Task } from '@/lib/types';
import { BarChart3, Briefcase, Heart, Users } from 'lucide-react';
import { TaskDetailsDialog } from './tasks/task-details-dialog';

const spaceIcons = {
  professional: Briefcase,
  personal: Heart,
  associative: Users,
};

interface ActivitySpacesProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
}

export function ActivitySpaces({ tasks, onTaskUpdate }: ActivitySpacesProps) {
  const spaces: ActivitySpace[] = ['professional', 'personal', 'associative'];

  const getTasksBySpace = (space: ActivitySpace) => {
    return tasks.filter(task => task.space === space);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {spaces.map((space) => {
        const Icon = spaceIcons[space];
        const spaceTasks = getTasksBySpace(space);
        
        return (
          <Card key={space} className="relative overflow-hidden">
            <div
              className={`absolute top-0 left-0 w-1 h-full ${SPACE_COLORS[space]}`}
            />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {SPACE_NAMES[space]}
              </CardTitle>
              <Icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <TaskDetailsDialog
                  space={space}
                  tasks={spaceTasks}
                  onTaskUpdate={onTaskUpdate}
                />
                <div className="h-12 w-12">
                  <BarChart3 className="w-full h-full text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}