import { ActivitySpace } from '@/lib/types';

export interface LineItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discount?: number;
}

export interface BillingDocument {
  id: string;
  type: 'invoice' | 'quote';
  number: string;
  clientId: string;
  date: Date;
  dueDate?: Date;
  items: LineItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  notes?: string;
  terms?: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  notes?: string;
  tags: string[];
  status: 'active' | 'inactive' | 'lead' | 'prospect';
  assignedSpace: ActivitySpace;
  lastContact?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BillingSettings {
  companyName: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  taxNumber?: string;
  bankDetails?: {
    name: string;
    iban: string;
    bic: string;
  };
  defaultTaxRate: number;
  defaultPaymentTerms: string;
  defaultNotes: string;
  logo?: string;
}

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  amount: number;
  date: Date;
  method: 'bank_transfer' | 'credit_card' | 'cash' | 'other';
  reference?: string;
  notes?: string;
  createdAt: Date;
}