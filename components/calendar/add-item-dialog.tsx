'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { TaskDialog } from '../tasks/task-dialog';
import { EventDialog } from './event-dialog';
import { Task, CalendarEvent } from '@/lib/types';

interface AddItemDialogProps {
  onTaskCreate: (task: Task) => void;
  onEventCreate: (event: CalendarEvent) => void;
}

export function AddItemDialog({ onTaskCreate, onEventCreate }: AddItemDialogProps) {
  const [open, setOpen] = useState(false);

  const handleTaskCreate = (task: Task) => {
    onTaskCreate(task);
    setOpen(false);
  };

  const handleEventCreate = (event: CalendarEvent) => {
    onEventCreate(event);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter un élément</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="task">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="task">Tâche</TabsTrigger>
            <TabsTrigger value="event">Événement</TabsTrigger>
          </TabsList>
          <TabsContent value="task">
            <TaskDialog onTaskCreate={handleTaskCreate} hideDialog />
          </TabsContent>
          <TabsContent value="event">
            <EventDialog onEventCreate={handleEventCreate} hideDialog />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}