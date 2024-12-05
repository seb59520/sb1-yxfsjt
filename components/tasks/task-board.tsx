'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Task, ActivitySpace } from '@/lib/types';
import { 
  SPACE_NAMES, 
  SPACE_COLORS, 
  SPACE_BORDER_COLORS, 
  SPACE_BACKGROUND_COLORS,
  SPACE_TEXT_COLORS 
} from '@/lib/constants';
import { TaskItem } from './task-item';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TaskBoardProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
}

export function TaskBoard({ tasks, onTaskUpdate }: TaskBoardProps) {
  const [columns] = useState<ActivitySpace[]>(['professional', 'personal', 'associative']);

  const getTasksBySpace = (space: ActivitySpace) => {
    return tasks.filter(task => task.space === space);
  };

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find(t => t.id === draggableId);
    if (!task) return;

    onTaskUpdate({
      ...task,
      space: destination.droppableId as ActivitySpace,
      updatedAt: new Date(),
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(space => (
          <Card 
            key={space} 
            className={cn(
              "p-4 border-2 shadow-md",
              SPACE_BORDER_COLORS[space],
              SPACE_BACKGROUND_COLORS[space]
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={cn("font-semibold", SPACE_TEXT_COLORS[space])}>
                {SPACE_NAMES[space]}
              </h3>
              <div className={cn('w-3 h-3 rounded-full', SPACE_COLORS[space])} />
            </div>
            <Droppable droppableId={space}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    'min-h-[200px] rounded-lg p-2 transition-colors',
                    snapshot.isDraggingOver && 'bg-muted/50'
                  )}
                >
                  {getTasksBySpace(space).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2"
                        >
                          <TaskItem task={task} onTaskUpdate={onTaskUpdate} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Card>
        ))}
      </div>
    </DragDropContext>
  );
}