'use client';

import { Subscription } from '@/lib/types/subscriptions';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, CreditCard } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import { SPACE_BORDER_COLORS, SPACE_BACKGROUND_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface SubscriptionCardProps {
  subscription: Subscription;
  onRenewToggle: (id: string, autoRenew: boolean) => void;
}

export function SubscriptionCard({ subscription, onRenewToggle }: SubscriptionCardProps) {
  return (
    <Card className={cn(
      'border-2',
      SPACE_BORDER_COLORS[subscription.space],
      SPACE_BACKGROUND_COLORS[subscription.space]
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <Image
              src={subscription.logo}
              alt={subscription.provider}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="font-semibold">{subscription.name}</h3>
            <p className="text-sm text-muted-foreground">{subscription.provider}</p>
          </div>
        </div>
        <Badge
          variant={subscription.status === 'active' ? 'default' : 'secondary'}
          className="capitalize"
        >
          {subscription.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-muted-foreground">
              <CreditCard className="w-4 h-4 mr-1" />
              {subscription.cost} {subscription.currency}/{subscription.billingCycle}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4 mr-1" />
              {format(subscription.nextBillingDate, 'PP')}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onRenewToggle(subscription.id, !subscription.autoRenew)}
          >
            {subscription.autoRenew ? 'Cancel Auto-Renewal' : 'Enable Auto-Renewal'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}