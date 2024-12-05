'use client';

import { useState } from 'react';
import { Subscription } from '@/lib/types/subscriptions';
import { SubscriptionCard } from './subscription-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface SubscriptionListProps {
  subscriptions: Subscription[];
}

export function SubscriptionList({ subscriptions }: SubscriptionListProps) {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesFilter = filter === 'all' || sub.category === filter;
    const matchesSearch = sub.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.provider.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = Array.from(
    new Set(subscriptions.map((sub) => sub.category))
  );

  const handleRenewToggle = (id: string, autoRenew: boolean) => {
    // In a real app, this would update the subscription in the database
    console.log(`Toggling auto-renewal for subscription ${id} to ${autoRenew}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search subscriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSubscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            subscription={subscription}
            onRenewToggle={handleRenewToggle}
          />
        ))}
      </div>
    </div>
  );
}