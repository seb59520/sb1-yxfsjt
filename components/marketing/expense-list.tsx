'use client';

import { Expense, EXPENSE_CATEGORIES } from '@/lib/types/marketing';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Receipt } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
}

export function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium">{expense.description}</h4>
                <Badge variant="outline">
                  {EXPENSE_CATEGORIES[expense.category].name}
                </Badge>
                {expense.reimbursed && (
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    Reimbursed
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Receipt className="w-4 h-4 mr-1" />
                  {expense.amount} {expense.currency}
                </div>
                <div>{format(new Date(expense.date), 'PP')}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}