'use client';

import { SubscriptionList } from '@/components/subscriptions/subscription-list';
import { PROFESSIONAL_SUBSCRIPTIONS } from '@/lib/types/subscriptions';

const sampleSubscriptions = PROFESSIONAL_SUBSCRIPTIONS.map((sub) => ({
  ...sub,
  cost: 15.99,
  currency: 'EUR',
  billingCycle: 'monthly' as const,
  space: 'professional' as const,
  nextBillingDate: new Date(2024, 4, 1),
  status: 'active' as const,
  autoRenew: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export default function ProfessionalSubscriptionsPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Professional Subscriptions</h1>
      <SubscriptionList subscriptions={sampleSubscriptions} />
    </main>
  );
}