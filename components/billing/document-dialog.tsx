'use client';

import { useState } from 'react';
import { BillingDocument, Client, LineItem } from '@/lib/types/billing';
import { Product } from '@/lib/types/crm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { createEmptyLineItem, calculateTotals, createEmptyDocument } from '@/lib/utils/billing';

interface DocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDocumentCreate?: (document: BillingDocument) => void;
  onDocumentUpdate?: (document: BillingDocument) => void;
  document?: BillingDocument;
  client?: Client;
  clients?: Client[];
  products?: Product[];
}

export function DocumentDialog({
  open,
  onOpenChange,
  onDocumentCreate,
  onDocumentUpdate,
  document,
  client,
  clients = [],
  products = [],
}: DocumentDialogProps) {
  const [items, setItems] = useState<LineItem[]>(document?.items || []);

  const form = useForm<Partial<BillingDocument>>({
    defaultValues: document || createEmptyDocument('invoice'),
  });

  const addItem = () => {
    setItems([...items, createEmptyLineItem()]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        if (field === 'productId' && products) {
          const product = products.find(p => p.id === value);
          if (product) {
            return {
              ...item,
              [field]: value,
              description: product.description || product.name,
              unitPrice: product.price,
            };
          }
        }
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const onSubmit = (data: Partial<BillingDocument>) => {
    const { subtotal, taxTotal, total } = calculateTotals(items);
    
    const documentData: BillingDocument = {
      ...createEmptyDocument(data.type || 'invoice'),
      ...data,
      items,
      subtotal,
      taxTotal,
      total,
      updatedAt: new Date(),
    } as BillingDocument;

    if (document) {
      onDocumentUpdate?.(documentData);
    } else {
      onDocumentCreate?.(documentData);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {document ? 'Modifier le document' : 'Nouveau document'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="invoice">Facture</SelectItem>
                        <SelectItem value="quote">Devis</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients?.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name} {client.company ? `(${client.company})` : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Articles</h3>
                <Button type="button" onClick={addItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un article
                </Button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                      <Select
                        value={item.productId}
                        onValueChange={(value) => updateItem(item.id, 'productId', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un produit" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <Input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Quantité"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Prix unitaire"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        type="number"
                        placeholder="TVA %"
                        value={item.taxRate}
                        onChange={(e) => updateItem(item.id, 'taxRate', parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conditions</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <div className="text-right">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Sous-total: {calculateTotals(items).subtotal.toFixed(2)} €
                  </div>
                  <div className="text-sm text-muted-foreground">
                    TVA: {calculateTotals(items).taxTotal.toFixed(2)} €
                  </div>
                  <div className="text-lg font-bold">
                    Total: {calculateTotals(items).total.toFixed(2)} €
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="submit">
                {document ? 'Mettre à jour' : 'Créer'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}