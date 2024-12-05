'use client';

import { useState } from 'react';
import { ClientList } from '@/components/crm/client-list';
import { Client } from '@/lib/types/crm';

const initialClients: Client[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    company: 'Tech Solutions',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    status: 'active',
    assignedSpace: 'professional',
    tags: ['tech', 'consulting'],
    lastContact: new Date(2024, 2, 15),
    createdAt: new Date(2023, 1, 1),
    updatedAt: new Date(2024, 2, 15),
  },
  {
    id: '2',
    name: 'Marie Martin',
    company: 'Design Studio',
    email: 'marie.martin@example.com',
    status: 'lead',
    assignedSpace: 'professional',
    tags: ['design', 'creative'],
    createdAt: new Date(2024, 2, 1),
    updatedAt: new Date(2024, 2, 1),
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients);

  const handleClientCreate = (newClient: Client) => {
    setClients(prev => [...prev, newClient]);
  };

  const handleClientUpdate = (updatedClient: Client) => {
    setClients(prev =>
      prev.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  };

  return (
    <main className="container mx-auto p-6">
      <ClientList
        clients={clients}
        onClientCreate={handleClientCreate}
        onClientUpdate={handleClientUpdate}
      />
    </main>
  );
}