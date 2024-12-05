'use client';

import { useState } from 'react';
import { TimeTrackingSettings } from '@/lib/types/timesheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TimeTrackingSettingsProps {
  settings: TimeTrackingSettings;
  onSettingsChange: (settings: TimeTrackingSettings) => void;
}

export function TimeTrackingSettingsDialog({
  settings,
  onSettingsChange,
}: TimeTrackingSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Tracking Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="time-tracking-enabled">Enable Time Tracking</Label>
          <Switch
            id="time-tracking-enabled"
            checked={settings.enabled}
            onCheckedChange={(checked) =>
              onSettingsChange({ ...settings, enabled: checked })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Work Day Hours</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="work-day-start">Start Time</Label>
              <Input
                id="work-day-start"
                type="time"
                value={settings.workDayStart}
                onChange={(e) =>
                  onSettingsChange({ ...settings, workDayStart: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="work-day-end">End Time</Label>
              <Input
                id="work-day-end"
                type="time"
                value={settings.workDayEnd}
                onChange={(e) =>
                  onSettingsChange({ ...settings, workDayEnd: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="default-break">Default Break Duration (minutes)</Label>
          <Input
            id="default-break"
            type="number"
            min="0"
            value={settings.defaultBreakDuration}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                defaultBreakDuration: parseInt(e.target.value),
              })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="auto-checkout">Auto Check-out at End Time</Label>
          <Switch
            id="auto-checkout"
            checked={settings.autoCheckOut}
            onCheckedChange={(checked) =>
              onSettingsChange({ ...settings, autoCheckOut: checked })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}