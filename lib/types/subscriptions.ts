import { ActivitySpace } from '@/lib/types';

export interface Subscription {
  id: string;
  name: string;
  provider: string;
  logo: string;
  description?: string;
  cost: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'quarterly';
  category: string;
  space: ActivitySpace;
  nextBillingDate: Date;
  status: 'active' | 'cancelled' | 'expired';
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const PERSONAL_SUBSCRIPTIONS = [
  {
    id: 'icloud',
    name: 'iCloud+',
    provider: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/1200px-Apple_logo_grey.svg.png',
    category: 'cloud-storage',
  },
  {
    id: 'spotify',
    name: 'Spotify Premium',
    provider: 'Spotify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png',
    category: 'entertainment',
  },
  {
    id: 'netflix',
    name: 'Netflix',
    provider: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
    category: 'entertainment',
  },
  {
    id: 'canal-plus',
    name: 'Canal+',
    provider: 'Canal+',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Canal%2B.svg/2560px-Canal%2B.svg.png',
    category: 'entertainment',
  },
];

export const PROFESSIONAL_SUBSCRIPTIONS = [
  {
    id: 'stackblitz',
    name: 'StackBlitz',
    provider: 'StackBlitz',
    logo: 'https://c.staticblitz.com/assets/icons/icon-144x144-087fc0a60521f81682590a4794f8ac61.png',
    category: 'development',
  },
  {
    id: 'vercel',
    name: 'Vercel Pro',
    provider: 'Vercel',
    logo: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png',
    category: 'hosting',
  },
  {
    id: 'notion',
    name: 'Notion Team',
    provider: 'Notion',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    category: 'productivity',
  },
  {
    id: 'figma',
    name: 'Figma Professional',
    provider: 'Figma',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
    category: 'design',
  },
];