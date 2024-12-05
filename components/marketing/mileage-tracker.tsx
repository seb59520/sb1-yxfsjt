'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateDistance } from '@/lib/maps/distance';
import { calculateMileageExpense } from '@/lib/marketing/expense-calculator';
import { MapPin } from 'lucide-react';

interface MileageEntry {
  id: string;
  origin: string;
  destination: string;
  distance: number;
  amount: number;
  date: Date;
}

export function MileageTracker() {
  const [entries, setEntries] = useState<MileageEntry[]>([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [calculating, setCalculating] = useState(false);

  const handleCalculate = async () => {
    if (!origin || !destination) return;
    
    setCalculating(true);
    try {
      const distance = await calculateDistance(origin, destination);
      const amount = calculateMileageExpense(distance);
      
      const newEntry: MileageEntry = {
        id: crypto.randomUUID(),
        origin,
        destination,
        distance,
        amount,
        date: new Date(),
      };
      
      setEntries((prev) => [...prev, newEntry]);
      setOrigin('');
      setDestination('');
    } catch (error) {
      console.error('Failed to calculate distance:', error);
    } finally {
      setCalculating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mileage Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="origin">Origin</Label>
            <div className="flex gap-2">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <Input
                id="origin"
                placeholder="Enter starting address"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <div className="flex gap-2">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <Input
                id="destination"
                placeholder="Enter destination address"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleCalculate} disabled={calculating}>
            {calculating ? 'Calculating...' : 'Calculate Distance'}
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Recent Entries</h3>
          <div className="space-y-2">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-lg border bg-card text-card-foreground"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="font-medium">
                      {entry.origin} → {entry.destination}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {entry.distance.toFixed(1)} km • {entry.amount.toFixed(2)} €
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {entry.date.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}