'use client';

import { Client, ClientStats } from '@/lib/types/crm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Mail,
  Phone,
  Calendar,
  BarChart,
  Edit,
} from 'lucide-react';
import { format } from 'date-fns';
import { SPACE_BORDER_COLORS, SPACE_BACKGROUND_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ClientDialog } from './client-dialog';
import { useState } from 'react';

interface ClientCardProps {
  client: Client;
  stats?: ClientStats;
  onUpdate: (client: Client) => void;
}

const statusColors = {
  active: 'bg-emerald-500 text-white',
  inactive: 'bg-slate-500 text-white',
  lead: 'bg-amber-500 text-white',
  prospect: 'bg-blue-500 text-white',
};

export function ClientCard({ client, stats, onUpdate }: ClientCardProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Card className={cn(
      'border-2',
      SPACE_BORDER_COLORS[client.assignedSpace],
      SPACE_BACKGROUND_COLORS[client.assignedSpace]
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold">{client.name}</h3>
          {client.company && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Building2 className="w-4 h-4 mr-1" />
              {client.company}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn('capitalize', statusColors[client.status])}
          >
            {client.status}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowDialog(true)}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Mail className="w-4 h-4 mr-2" />
              {client.email}
            </div>
            {client.phone && (
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2" />
                {client.phone}
              </div>
            )}
            {client.lastContact && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                Dernier contact : {format(new Date(client.lastContact), 'PP')}
              </div>
            )}
          </div>

          {stats && (
            <div className="pt-4 border-t space-y-2">
              <div className="flex items-center text-sm">
                <BarChart className="w-4 h-4 mr-2" />
                <span className="font-medium">Statistiques</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Total ventes</p>
                  <p className="font-medium">{stats.totalSales} €</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Valeur moyenne</p>
                  <p className="font-medium">{stats.averageOrderValue} €</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <ClientDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onClientUpdate={onUpdate}
        client={client}
      />
    </Card>
  );
}