import { CalendarEvent } from '@/lib/types';

export const SAMPLE_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Client Meeting',
    description: 'Quarterly review with major client',
    space: 'professional',
    startDate: new Date(2024, 11, 4, 10, 0),
    endDate: new Date(2024, 11, 4, 11, 30),
    allDay: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Team Workshop',
    description: 'Annual planning session',
    space: 'professional',
    startDate: new Date(2024, 11, 12, 9, 0),
    endDate: new Date(2024, 11, 12, 17, 0),
    allDay: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Gym Session',
    description: 'Weekly workout',
    space: 'personal',
    startDate: new Date(2024, 11, 6, 18, 0),
    endDate: new Date(2024, 11, 6, 19, 30),
    allDay: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Community Event',
    description: 'Local charity fundraiser',
    space: 'associative',
    startDate: new Date(2024, 11, 15, 14, 0),
    endDate: new Date(2024, 11, 15, 18, 0),
    allDay: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    title: 'Project Deadline',
    description: 'Final deliverables due',
    space: 'professional',
    startDate: new Date(2024, 11, 20, 17, 0),
    endDate: new Date(2024, 11, 20, 17, 0),
    allDay: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];