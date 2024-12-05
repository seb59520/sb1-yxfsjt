'use client';

import { Card } from '@/components/ui/card';
import { Achievements } from '@/components/gamification/achievements';
import { CalendarSettingsDialog } from '@/components/settings/calendar-settings';
import { useState } from 'react';
import { CalendarSettings } from '@/lib/types';

const defaultSettings: CalendarSettings = {
  country: 'FR',
  schoolZone: 'A',
  showPublicHolidays: true,
  showSchoolVacations: true,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<CalendarSettings>(defaultSettings);

  return (
    <main className="container mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Calendar Settings</h3>
          <CalendarSettingsDialog
            settings={settings}
            onSettingsChange={setSettings}
          />
        </Card>

        <Card className="p-6">
          <Achievements achievements={[
            {
              id: '1',
              title: 'Task Master',
              description: 'Complete 100 tasks',
              icon: 'trophy',
              progress: 25,
              total: 100,
            },
            {
              id: '2',
              title: 'Streak Champion',
              description: 'Maintain a 7-day streak',
              icon: 'flame',
              progress: 5,
              total: 7,
            },
            {
              id: '3',
              title: 'Space Explorer',
              description: 'Use all activity spaces',
              icon: 'target',
              unlockedAt: new Date(),
              progress: 3,
              total: 3,
            },
          ]} />
        </Card>
      </div>
    </main>
  );
}