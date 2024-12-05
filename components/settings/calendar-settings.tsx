'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CalendarSettings } from '@/lib/types';
import { COUNTRIES, FRENCH_SCHOOL_ZONES, FRENCH_REGIONS } from '@/lib/calendar/holidays';

interface CalendarSettingsDialogProps {
  settings: CalendarSettings;
  onSettingsChange: (settings: CalendarSettings) => void;
}

export function CalendarSettingsDialog({
  settings,
  onSettingsChange,
}: CalendarSettingsDialogProps) {
  const handleCountryChange = (country: string) => {
    onSettingsChange({
      ...settings,
      country,
      region: undefined,
      schoolZone: undefined,
    });
  };

  const showZoneSelector = settings.country === 'FR';
  const showRegionSelector = settings.country === 'FR';

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Country</Label>
            <Select
              value={settings.country}
              onValueChange={handleCountryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showRegionSelector && (
            <div className="space-y-2">
              <Label>Region</Label>
              <Select
                value={settings.region}
                onValueChange={(region) =>
                  onSettingsChange({ ...settings, region })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {FRENCH_REGIONS.map((region) => (
                    <SelectItem key={region.code} value={region.code}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showZoneSelector && (
            <div className="space-y-2">
              <Label>School Zone</Label>
              <Select
                value={settings.schoolZone}
                onValueChange={(zone) =>
                  onSettingsChange({ ...settings, schoolZone: zone })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select school zone" />
                </SelectTrigger>
                <SelectContent>
                  {FRENCH_SCHOOL_ZONES.map((zone) => (
                    <SelectItem key={zone.code} value={zone.code}>
                      {zone.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="show-holidays">Show Public Holidays</Label>
            <Switch
              id="show-holidays"
              checked={settings.showPublicHolidays}
              onCheckedChange={(checked) =>
                onSettingsChange({ ...settings, showPublicHolidays: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="show-vacations">Show School Vacations</Label>
            <Switch
              id="show-vacations"
              checked={settings.showSchoolVacations}
              onCheckedChange={(checked) =>
                onSettingsChange({ ...settings, showSchoolVacations: checked })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}