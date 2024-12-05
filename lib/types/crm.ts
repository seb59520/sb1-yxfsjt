import { ActivitySpace } from './index';

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

export interface Interaction {
  id: string;
  clientId: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  subject: string;
  description: string;
  date: Date;
  outcome?: string;
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  sku?: string;
  stock?: number;
  status: 'active' | 'inactive' | 'discontinued';
  space: ActivitySpace;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Sale {
  id: string;
  clientId: string;
  products: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
  total: number;
  currency: string;
  status: 'pending' | 'completed' | 'cancelled';
  date: Date;
  paymentMethod?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientStats {
  totalSales: number;
  averageOrderValue: number;
  lastPurchaseDate?: Date;
  purchaseFrequency: number;
  lifetimeValue: number;
}

export interface ProductStats {
  totalSales: number;
  revenue: number;
  averageOrderQuantity: number;
  stockTurnover?: number;
}