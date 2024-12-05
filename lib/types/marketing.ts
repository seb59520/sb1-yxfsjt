export interface MarketingEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  type: 'meeting' | 'campaign' | 'event';
  location?: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  expenses?: Expense[];
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  currency: string;
  category: 'transport' | 'meals' | 'accommodation' | 'other';
  date: Date;
  receipt?: string;
  reimbursed: boolean;
  marketingEventId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpenseReport {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  expenses: Expense[];
  total: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const EXPENSE_CATEGORIES = {
  transport: {
    name: 'Transport',
    icon: 'car',
    allowance: {
      car: 0.30, // €/km
      taxi: 50, // Max €
      train: 200, // Max €
    },
  },
  meals: {
    name: 'Meals',
    icon: 'utensils',
    allowance: {
      breakfast: 15,
      lunch: 25,
      dinner: 35,
    },
  },
  accommodation: {
    name: 'Accommodation',
    icon: 'hotel',
    allowance: {
      hotel: 150, // Max € per night
    },
  },
  other: {
    name: 'Other',
    icon: 'more-horizontal',
    allowance: {},
  },
};