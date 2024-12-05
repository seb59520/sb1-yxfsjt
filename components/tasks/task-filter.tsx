'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SPACE_NAMES } from '@/lib/constants';

interface TaskFilterProps {
  currentFilter: {
    space?: string;
    status?: string;
  };
  onFilterChange: (filter: { space?: string; status?: string }) => void;
}

export function TaskFilter({ currentFilter, onFilterChange }: TaskFilterProps) {
  return (
    <div className="flex gap-2">
      <Select
        value={currentFilter.space || "all-spaces"}
        onValueChange={(value) =>
          onFilterChange({ 
            ...currentFilter, 
            space: value === "all-spaces" ? undefined : value 
          })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by space" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-spaces">All Spaces</SelectItem>
          {Object.entries(SPACE_NAMES).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={currentFilter.status || "all-statuses"}
        onValueChange={(value) =>
          onFilterChange({ 
            ...currentFilter, 
            status: value === "all-statuses" ? undefined : value 
          })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-statuses">All Statuses</SelectItem>
          <SelectItem value="todo">To Do</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}