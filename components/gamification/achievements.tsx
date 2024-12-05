'use client';

import { Achievement } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
              {achievement.unlockedAt && (
                <Trophy className="w-5 h-5 text-yellow-500" />
              )}
            </div>
            <Progress
              value={(achievement.progress / achievement.total) * 100}
              className="h-2"
            />
            <p className="text-xs text-muted-foreground text-right">
              {achievement.progress} / {achievement.total}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}