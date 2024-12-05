'use client';

import { TimeTrackingAnalytics } from '@/components/time-tracking/time-tracking-analytics';
import { Card } from '@/components/ui/card';

export default function TimeTrackingAnalyticsPage() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Time Analytics</h1>
      <Card className="p-4">
        <TimeTrackingAnalytics />
      </Card>
    </main>
  );
}