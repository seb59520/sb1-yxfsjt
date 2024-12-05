'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  SPACE_NAMES, 
  SPACE_BORDER_COLORS, 
  SPACE_TEXT_COLORS, 
  SPACE_BACKGROUND_COLORS,
  SPACE_HOVER_COLORS 
} from '@/lib/constants';
import { ActivitySpace } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SpaceSelectorProps {
  selectedSpace: ActivitySpace | 'all';
  onSpaceChange: (space: ActivitySpace | 'all') => void;
}

export function SpaceSelector({ selectedSpace, onSpaceChange }: SpaceSelectorProps) {
  const spaces: (ActivitySpace | 'all')[] = ['all', 'professional', 'personal', 'associative'];

  return (
    <Card className="p-4">
      <div className="flex flex-wrap gap-2">
        {spaces.map((space) => {
          const isSelected = selectedSpace === space;
          const isSpace = space !== 'all';
          
          return (
            <Button
              key={space}
              variant="outline"
              size="sm"
              onClick={() => onSpaceChange(space)}
              className={cn(
                'border-2 transition-all duration-200',
                isSpace && [
                  SPACE_BORDER_COLORS[space as ActivitySpace],
                  SPACE_HOVER_COLORS[space as ActivitySpace],
                  isSelected && [
                    SPACE_BACKGROUND_COLORS[space as ActivitySpace],
                    SPACE_TEXT_COLORS[space as ActivitySpace]
                  ]
                ],
                !isSpace && [
                  isSelected && 'bg-secondary'
                ]
              )}
            >
              {space === 'all' ? 'Tous les espaces' : SPACE_NAMES[space as ActivitySpace]}
            </Button>
          );
        })}
      </div>
    </Card>
  );
}