'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

export function TimeTrackingDashboard() {
  const [weeklyStats, setWeeklyStats] = useState({
    totalHours: 0,
    targetHours: 40,
    overtime: 0,
    averageDailyHours: 0,
  });

  // Simulated data - replace with actual data in production
  useEffect(() => {
    setWeeklyStats({
      totalHours: 35,
      targetHours: 40,
      overtime: 0,
      averageDailyHours: 7,
    });
  }, []);

  const progressPercentage = (weeklyStats.totalHours / weeklyStats.targetHours) * 100;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-2 border-amber-500 dark:border-amber-400">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Hours</CardTitle>
          <Clock className="h-4 w-4 text-amber-500 dark:text-amber-400" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">
              {weeklyStats.totalHours}h / {weeklyStats.targetHours}h
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {progressPercentage.toFixed(1)}% of weekly target
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-amber-500 dark:border-amber-400">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today</CardTitle>
          <Calendar className="h-4 w-4 text-amber-500 dark:text-amber-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">7h 30m</div>
          <p className="text-xs text-muted-foreground mt-2">
            Target: 8h 00m
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-amber-500 dark:border-amber-400">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Daily</CardTitle>
          <TrendingUp className="h-4 w-4 text-amber-500 dark:text-amber-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">
            {weeklyStats.averageDailyHours}h
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Based on this week
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-amber-500 dark:border-amber-400">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overtime</CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{weeklyStats.overtime}h</div>
          <p className="text-xs text-muted-foreground mt-2">
            Additional hours this week
          </p>
        </CardContent>
      </Card>
    </div>
  );
}