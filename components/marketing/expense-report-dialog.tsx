'use client';

import { useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Expense, ExpenseReport } from '@/lib/types/marketing';
import { useForm } from 'react-hook-form';
import { FileText } from 'lucide-react';

interface ExpenseReportDialogProps {
  expenses: Expense[];
  onReportCreate: (report: ExpenseReport) => void;
}

export function ExpenseReportDialog({
  expenses,
  onReportCreate,
}: ExpenseReportDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);
  const form = useForm<Partial<ExpenseReport>>();

  const totalAmount = expenses
    .filter((expense) => selectedExpenses.includes(expense.id))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const onSubmit = (data: Partial<ExpenseReport>) => {
    const selectedExpenseItems = expenses.filter((expense) =>
      selectedExpenses.includes(expense.id)
    );

    onReportCreate({
      ...data,
      id: crypto.randomUUID(),
      expenses: selectedExpenseItems,
      total: totalAmount,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as ExpenseReport);

    form.reset();
    setSelectedExpenses([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <FileText className="w-4 h-4 mr-2" />
          Create Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Expense Report</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter report title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <FormLabel>Select Expenses</FormLabel>
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedExpenses.includes(expense.id)}
                    onCheckedChange={(checked) => {
                      setSelectedExpenses((prev) =>
                        checked
                          ? [...prev, expense.id]
                          : prev.filter((id) => id !== expense.id)
                      );
                    }}
                  />
                  <span>
                    {expense.description} - {expense.amount} {expense.currency}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Total Amount:</span>
              <span className="font-medium">
                {totalAmount.toFixed(2)} EUR
              </span>
            </div>
            <Button type="submit">Create Report</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}