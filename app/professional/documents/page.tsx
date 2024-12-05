'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { DocumentList } from '@/components/billing/document-list';
import { BillingDocument } from '@/lib/types/billing';
import { Product } from '@/lib/types/crm';

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Consultation Web',
    description: 'Service de consultation pour projets web',
    category: 'Services',
    price: 150,
    currency: 'EUR',
    status: 'active',
    space: 'professional',
    tags: ['web', 'consulting'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Formation React',
    description: 'Formation complète sur React et Next.js',
    category: 'Formation',
    price: 999,
    currency: 'EUR',
    status: 'active',
    space: 'professional',
    tags: ['react', 'formation'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const sampleClients = [
  {
    id: '1',
    name: 'Jean Dupont',
    company: 'Tech Solutions',
    email: 'jean.dupont@example.com',
    status: 'active',
    assignedSpace: 'professional',
    tags: ['tech'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Marie Martin',
    company: 'Design Studio',
    email: 'marie.martin@example.com',
    status: 'active',
    assignedSpace: 'professional',
    tags: ['design'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<BillingDocument[]>([]);
  const [clients] = useState(sampleClients);
  const [products] = useState(sampleProducts);

  const handleDocumentCreate = (newDocument: BillingDocument) => {
    setDocuments(prev => [...prev, newDocument]);
  };

  const handleDocumentUpdate = (updatedDocument: BillingDocument) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === updatedDocument.id ? updatedDocument : doc
      )
    );
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Documents</h1>
      <DocumentList
        documents={documents}
        clients={clients}
        products={products}
        onDocumentCreate={handleDocumentCreate}
        onDocumentUpdate={handleDocumentUpdate}
      />
    </main>
  );
}