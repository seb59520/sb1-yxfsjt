export type ActivitySpace = 'professional' | 'personal' | 'associative';

export interface Task {
  id: string;
  title: string;
  description?: string;
  space: ActivitySpace;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  space: ActivitySpace;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  location?: string;
  attendees?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Holiday {
  date: Date;
  name: string;
  type: 'public' | 'school';
  country: string;
  region?: string;
}

export interface SchoolVacation {
  startDate: Date;
  endDate: Date;
  name: string;
  zone: string;
  country: string;
}

export interface CalendarSettings {
  country: string;
  region?: string;
  schoolZone?: string;
  showPublicHolidays: boolean;
  showSchoolVacations: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress: number;
  total: number;
}

export interface UserStats {
  tasksCompleted: number;
  streakDays: number;
  achievements: Achievement[];
  level: number;
  experience: number;
  nextLevelExperience: number;
}