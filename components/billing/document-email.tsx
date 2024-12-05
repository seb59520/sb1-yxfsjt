```typescript
'use client';

import { useState } from 'react';
import { BillingDocument, Client } from '@/lib/types/billing';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';

interface DocumentEmailProps {
  document: BillingDocument;
  client?: Client;
  onSend: (document: BillingDocument) => void;
}

interface EmailForm {
  to: string;
  subject: string;
  message: string;
}

export function DocumentEmail({ document, client, onSend }: DocumentEmailProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<EmailForm>({
    defaultValues: {
      to: client?.email || '',
      subject: `${document.type === 'invoice' ? 'Facture' : 'Devis'} ${document.number}`,
      message: `Cher/Chère ${client?.name},\n\nVeuillez trouver ci-joint ${
        document.type === 'invoice' ? 'la facture' : 'le devis'
      } ${document.number}.\n\nCordialement,`,
    },
  });

  const onSubmit = (data: EmailForm) => {
    // Here you would implement the actual email sending
    // For now, we'll just update the document status
    onSend({
      ...document,
      status: 'sent',
      updatedAt: new Date(),
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Send className="w-4 h-4 mr-2" />
          Envoyer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Envoyer le document</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destinataire</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objet</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea rows={6} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Envoyer</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```