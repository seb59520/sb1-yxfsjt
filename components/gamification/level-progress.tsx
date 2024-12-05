'use client';

import { UserStats } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, HelpCircle } from 'lucide-react';
import { LEVEL_DESCRIPTIONS } from '@/lib/constants';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface LevelProgressProps {
  stats: UserStats;
}

export function LevelProgress({ stats }: LevelProgressProps) {
  const progressPercentage = (stats.experience / stats.nextLevelExperience) * 100;
  const levelDescription = LEVEL_DESCRIPTIONS[stats.level as keyof typeof LEVEL_DESCRIPTIONS] || '';

  return (
    <Card className="border-2 border-primary">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Niveau {stats.level}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs border-2 border-primary bg-card">
                  <div className="space-y-2">
                    <p className="font-medium">{levelDescription}</p>
                    <p>Gagnez des points d'expérience (XP) en :</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Complétant des tâches (+50 XP)</li>
                      <li>Maintenant une série quotidienne (+20 XP/jour)</li>
                      <li>Utilisant tous les espaces d'activité (+30 XP)</li>
                      <li>Respectant les délais (+25 XP)</li>
                      <li>Débloquant des succès (+100 XP)</li>
                    </ul>
                    <p className="text-sm">Montez de niveau pour débloquer de nouvelles fonctionnalités et gagner des succès !</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="text-sm font-normal text-muted-foreground">
            {stats.experience} / {stats.nextLevelExperience} XP
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progressPercentage} className="h-2" />
        <p className="mt-2 text-sm text-muted-foreground">
          Complétez des tâches pour gagner de l'expérience et monter de niveau !
        </p>
      </CardContent>
    </Card>
  );
}