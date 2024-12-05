import { BillingDocument, LineItem } from '@/lib/types/billing';
import { v4 as uuidv4 } from 'uuid';

export function generateDocumentNumber(type: 'invoice' | 'quote', prefix = ''): string {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `${prefix}${type === 'invoice' ? 'INV' : 'QUO'}-${year}${month}-${random}`;
}

export function calculateTotals(items: LineItem[]): {
  subtotal: number;
  taxTotal: number;
  total: number;
} {
  const subtotal = items.reduce((sum, item) => 
    sum + (item.quantity * item.unitPrice * (1 - (item.discount || 0) / 100)), 0
  );

  const taxTotal = items.reduce((sum, item) => 
    sum + (item.quantity * item.unitPrice * (1 - (item.discount || 0) / 100) * (item.taxRate / 100)), 0
  );

  return {
    subtotal,
    taxTotal,
    total: subtotal + taxTotal,
  };
}

export function createEmptyDocument(type: 'invoice' | 'quote'): Partial<BillingDocument> {
  return {
    id: uuidv4(),
    type,
    number: generateDocumentNumber(type),
    date: new Date(),
    items: [],
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function createEmptyLineItem(): LineItem {
  return {
    id: uuidv4(),
    productId: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
    taxRate: 20,
  };
}