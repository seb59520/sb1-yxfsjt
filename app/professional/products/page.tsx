'use client';

import { useState } from 'react';
import { ProductList } from '@/components/crm/product-list';
import { Product } from '@/lib/types/crm';

const initialProducts: Product[] = [
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
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 1),
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
    createdAt: new Date(2024, 1, 1),
    updatedAt: new Date(2024, 1, 1),
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleProductCreate = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  return (
    <main className="container mx-auto p-6">
      <ProductList
        products={products}
        onProductCreate={handleProductCreate}
        onProductUpdate={handleProductUpdate}
      />
    </main>
  );
}