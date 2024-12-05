```typescript
'use client';

import { BillingDocument, Client } from '@/lib/types/billing';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface DocumentExportProps {
  document: BillingDocument;
  client?: Client;
}

export function DocumentExport({ document, client }: DocumentExportProps) {
  const generatePDF = () => {
    const pdf = new jsPDF();

    // Add header
    pdf.setFontSize(20);
    pdf.text(document.type === 'invoice' ? 'FACTURE' : 'DEVIS', 105, 20, { align: 'center' });
    
    // Add document info
    pdf.setFontSize(12);
    pdf.text(`N° ${document.number}`, 20, 40);
    pdf.text(`Date: ${new Date(document.date).toLocaleDateString()}`, 20, 50);

    // Add client info
    if (client) {
      pdf.text('Client:', 120, 40);
      pdf.text(client.name, 120, 50);
      if (client.company) pdf.text(client.company, 120, 60);
      pdf.text(client.email, 120, 70);
    }

    // Add items
    const tableData = document.items.map(item => [
      item.description,
      item.quantity.toString(),
      `${item.unitPrice.toFixed(2)} €`,
      `${item.taxRate}%`,
      `${(item.quantity * item.unitPrice * (1 + item.taxRate / 100)).toFixed(2)} €`
    ]);

    (pdf as any).autoTable({
      startY: 90,
      head: [['Description', 'Quantité', 'Prix unitaire', 'TVA', 'Total']],
      body: tableData,
    });

    // Add totals
    const finalY = (pdf as any).lastAutoTable.finalY + 10;
    pdf.text(`Sous-total: ${document.subtotal.toFixed(2)} €`, 140, finalY);
    pdf.text(`TVA: ${document.taxTotal.toFixed(2)} €`, 140, finalY + 10);
    pdf.text(`Total: ${document.total.toFixed(2)} €`, 140, finalY + 20);

    // Add notes and terms
    if (document.notes) {
      pdf.text('Notes:', 20, finalY + 40);
      pdf.setFontSize(10);
      pdf.text(document.notes, 20, finalY + 50);
    }

    if (document.terms) {
      pdf.setFontSize(12);
      pdf.text('Conditions:', 20, finalY + 70);
      pdf.setFontSize(10);
      pdf.text(document.terms, 20, finalY + 80);
    }

    // Save the PDF
    pdf.save(`${document.type}-${document.number}.pdf`);
  };

  return (
    <Button variant="outline" size="sm" onClick={generatePDF}>
      <Download className="w-4 h-4 mr-2" />
      Exporter en PDF
    </Button>
  );
}
```