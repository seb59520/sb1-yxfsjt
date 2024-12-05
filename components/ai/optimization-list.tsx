'use client';

import { Lightbulb } from 'lucide-react';

interface OptimizationListProps {
  optimizations: string[];
}

export function OptimizationList({ optimizations }: OptimizationListProps) {
  if (optimizations.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      <h4 className="font-medium">Optimisations suggérées :</h4>
      <ul className="space-y-2">
        {optimizations.map((optimization, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            {optimization}
          </li>
        ))}
      </ul>
    </div>
  );
}