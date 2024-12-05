'use client';

import { useState } from 'react';
import { Client } from '@/lib/types/crm';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ClientCard } from './client-card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ClientDialog } from './client-dialog';

interface ClientListProps {
  clients: Client[];
  onClientCreate: (client: Client) => void;
  onClientUpdate: (client: Client) => void;
}

export function ClientList({
  clients,
  onClientCreate,
  onClientUpdate,
}: ClientListProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [spaceFilter, setSpaceFilter] = useState<string>('all');
  const [showDialog, setShowDialog] = useState(false);

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.company?.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesSpace = spaceFilter === 'all' || client.assignedSpace === spaceFilter;

    return matchesSearch && matchesStatus && matchesSpace;
  });

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Clients</h2>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Client
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Rechercher des clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="inactive">Inactif</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="prospect">Prospect</SelectItem>
          </SelectContent>
        </Select>
        <Select value={spaceFilter} onValueChange={setSpaceFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par espace" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les espaces</SelectItem>
            <SelectItem value="professional">Professionnel</SelectItem>
            <SelectItem value="personal">Personnel</SelectItem>
            <SelectItem value="associative">Associatif</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onUpdate={onClientUpdate}
          />
        ))}
      </div>

      <ClientDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onClientCreate={onClientCreate}
      />
    </Card>
  );
}