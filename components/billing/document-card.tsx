'use client';

import { BillingDocument, Client } from '@/lib/types/billing';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Calendar,
  User,
  Edit,
  Download,
  Send,
} from 'lucide-react';
import { format } from 'date-fns';
import { DocumentDialog } from './document-dialog';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DocumentCardProps {
  document: BillingDocument;
  client?: Client;
  onUpdate: (document: BillingDocument) => void;
}

const statusColors = {
  draft: 'bg-slate-500 text-white',
  sent: 'bg-blue-500 text-white',
  paid: 'bg-emerald-500 text-white',
  overdue: 'bg-red-500 text-white',
  cancelled: 'bg-slate-500 text-white',
};

export function DocumentCard({ document, client, onUpdate }: DocumentCardProps) {
  const [showDialog, setShowDialog] = useState(false);

  const handleExport = () => {
    // Implement PDF export
  };

  const handleSend = () => {
    // Implement email sending
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold">{document.number}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="w-4 h-4 mr-1" />
            {document.type === 'invoice' ? 'Facture' : 'Devis'}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn('capitalize', statusColors[document.status])}
          >
            {document.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            {client && (
              <div className="flex items-center text-sm">
                <User className="w-4 h-4 mr-2" />
                {client.name}
              </div>
            )}
            <div className="flex items-center text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(document.date), 'PP')}
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-medium">
              {document.total.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setShowDialog(true)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleExport}
            >
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            {document.status === 'draft' && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleSend}
              >
                <Send className="w-4 h-4 mr-2" />
                Envoyer
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      <DocumentDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onDocumentUpdate={onUpdate}
        document={document}
        client={client}
      />
    </Card>
  );
}