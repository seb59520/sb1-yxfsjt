'use client';

import { useState } from 'react';
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
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ProductDialog } from './product-dialog';

interface ProductListProps {
  products: Product[];
  onProductCreate: (product: Product) => void;
  onProductUpdate: (product: Product) => void;
}

export function ProductList({
  products,
  onProductCreate,
  onProductUpdate,
}: ProductListProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [spaceFilter, setSpaceFilter] = useState<string>('all');
  const [showDialog, setShowDialog] = useState(false);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesSpace = spaceFilter === 'all' || product.space === spaceFilter;

    return matchesSearch && matchesCategory && matchesSpace;
  });

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Produits et Services</h2>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Produit
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Rechercher des produits..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
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
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdate={onProductUpdate}
          />
        ))}
      </div>

      <ProductDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onProductCreate={onProductCreate}
      />
    </Card>
  );
}