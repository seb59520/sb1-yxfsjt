'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Mon', hours: 8.5, color: '#f59e0b' },
  { name: 'Tue', hours: 7.75, color: '#f59e0b' },
  { name: 'Wed', hours: 8.25, color: '#f59e0b' },
  { name: 'Thu', hours: 9, color: '#f59e0b' },
  { name: 'Fri', hours: 7.5, color: '#f59e0b' },
];

export function TimeTrackingAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Weekly Overview</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="hours"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-2 border-amber-500 dark:border-amber-400">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Monthly Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">+2.5%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-amber-500 dark:border-amber-400">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Yearly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">1,642h</div>
            <p className="text-xs text-muted-foreground mt-1">
              Out of 2,080h yearly target
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}