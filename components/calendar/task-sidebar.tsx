'use client';

import { Task } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { SPACE_BORDER_COLORS, SPACE_BACKGROUND_COLORS, SPACE_TEXT_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface TaskSidebarProps {
  tasks: Task[];
}

export function TaskSidebar({ tasks }: TaskSidebarProps) {
  const unscheduledTasks = tasks.filter(task => !task.dueDate);

  return (
    <Card className="p-4 h-full">
      <h3 className="font-semibold mb-4">Unscheduled Tasks</h3>
      <Droppable droppableId="task-sidebar" isDropDisabled>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {unscheduledTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(
                      'p-3 rounded-lg border-2 cursor-move',
                      SPACE_BORDER_COLORS[task.space],
                      SPACE_BACKGROUND_COLORS[task.space]
                    )}
                  >
                    <p className={cn('font-medium', SPACE_TEXT_COLORS[task.space])}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {task.description}
                      </p>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );
}