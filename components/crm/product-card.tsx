'use client';

import { Product, ProductStats } from '@/lib/types/crm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tag,
  Package,
  BarChart,
  Edit,
} from 'lucide-react';
import { SPACE_BORDER_COLORS, SPACE_BACKGROUND_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ProductDialog } from './product-dialog';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  stats?: ProductStats;
  onUpdate: (product: Product) => void;
}

const statusColors = {
  active: 'bg-emerald-500 text-white',
  inactive: 'bg-slate-500 text-white',
  discontinued: 'bg-red-500 text-white',
};

export function ProductCard({ product, stats, onUpdate }: ProductCardProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Card className={cn(
      'border-2',
      SPACE_BORDER_COLORS[product.space],
      SPACE_BACKGROUND_COLORS[product.space]
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold">{product.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Package className="w-4 h-4 mr-1" />
            {product.category}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn('capitalize', statusColors[product.status])}
          >
            {product.status}
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
          <p className="text-sm text-muted-foreground">
            {product.description}
          </p>

          <div className="flex items-center justify-between text-sm">
            <div className="font-medium">
              {product.price} {product.currency}
            </div>
            {product.stock !== undefined && (
              <div className="text-muted-foreground">
                Stock: {product.stock}
              </div>
            )}
          </div>

          {product.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-1">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {stats && (
            <div className="pt-4 border-t space-y-2">
              <div className="flex items-center text-sm">
                <BarChart className="w-4 h-4 mr-2" />
                <span className="font-medium">Statistiques</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Ventes totales</p>
                  <p className="font-medium">{stats.totalSales}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Revenu</p>
                  <p className="font-medium">{stats.revenue} €</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <ProductDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onProductUpdate={onUpdate}
        product={product}
      />
    </Card>
  );
}