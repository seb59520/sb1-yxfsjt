'use client';

import { useState } from 'react';
import { BillingDocument, Client } from '@/lib/types/billing';
import { Product } from '@/lib/types/crm';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DocumentCard } from './document-card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DocumentDialog } from './document-dialog';

interface DocumentListProps {
  documents: BillingDocument[];
  clients: Client[];
  products: Product[];
  onDocumentCreate: (document: BillingDocument) => void;
  onDocumentUpdate: (document: BillingDocument) => void;
}

export function DocumentList({
  documents,
  clients,
  products,
  onDocumentCreate,
  onDocumentUpdate,
}: DocumentListProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showDialog, setShowDialog] = useState(false);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.number?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Documents</h2>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Document
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Rechercher par numéro..."
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
            <SelectItem value="draft">Brouillon</SelectItem>
            <SelectItem value="sent">Envoyé</SelectItem>
            <SelectItem value="paid">Payé</SelectItem>
            <SelectItem value="overdue">En retard</SelectItem>
            <SelectItem value="cancelled">Annulé</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="invoice">Factures</SelectItem>
            <SelectItem value="quote">Devis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            client={clients.find((c) => c.id === document.clientId)}
            onUpdate={onDocumentUpdate}
          />
        ))}
      </div>

      <DocumentDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        clients={clients}
        products={products}
        onDocumentCreate={onDocumentCreate}
      />
    </Card>
  );
}