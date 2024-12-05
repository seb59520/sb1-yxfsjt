'use client';

import { useState } from 'react';
import { TimeTrackingDashboard } from '@/components/time-tracking/time-tracking-dashboard';
import { TimeTrackingAnalytics } from '@/components/time-tracking/time-tracking-analytics';
import { TimeTrackingCalendar } from '@/components/time-tracking/time-tracking-calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

export default function TimesheetPage() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Time Tracking</h1>
      
      <TimeTrackingDashboard />

      <Tabs defaultValue="calendar">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <Card className="p-4">
            <TimeTrackingCalendar />
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card className="p-4">
            <TimeTrackingAnalytics />
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}