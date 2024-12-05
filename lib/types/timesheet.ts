import { ActivitySpace } from './index';

export interface TimeEntry {
  id: string;
  type: 'check-in' | 'check-out' | 'break-start' | 'break-end';
  timestamp: Date;
  note?: string;
}

export interface WorkDay {
  id: string;
  date: Date;
  entries: TimeEntry[];
  totalWorkTime: number; // in minutes
  totalBreakTime: number; // in minutes
  status: 'in-progress' | 'completed';
}

export interface TimeTrackingSettings {
  enabled: boolean;
  workDayStart: string; // HH:mm format
  workDayEnd: string; // HH:mm format
  defaultBreakDuration: number; // in minutes
  autoCheckOut: boolean;
  space: ActivitySpace;
}