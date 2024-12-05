'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Expense, ExpenseReport } from '@/lib/types/marketing';
import { ExpenseForm } from './expense-form';
import { ExpenseList } from './expense-list';
import { ExpenseReportDialog } from './expense-report-dialog';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [reports, setReports] = useState<ExpenseReport[]>([]);

  const handleExpenseCreate = (newExpense: Expense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleReportCreate = (newReport: ExpenseReport) => {
    setReports((prev) => [...prev, newReport]);
    
    // Mark expenses as reported
    const reportedExpenseIds = newReport.expenses.map((e) => e.id);
    setExpenses((prev) =>
      prev.filter((expense) => !reportedExpenseIds.includes(expense.id))
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Expense Tracker</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              View Reports
            </Button>
            <ExpenseReportDialog
              expenses={expenses}
              onReportCreate={handleReportCreate}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <ExpenseForm onExpenseCreate={handleExpenseCreate} />
        <ExpenseList expenses={expenses} />
      </CardContent>
    </Card>
  );
}