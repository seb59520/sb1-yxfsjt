interface MileageExpense {
  distance: number;
  rate: number;
  date: Date;
}

const DEFAULT_MILEAGE_RATE = 0.30; // €/km

export function calculateMileageExpense(
  distance: number,
  rate: number = DEFAULT_MILEAGE_RATE
): number {
  return distance * rate;
}

export function generateMileageReport(expenses: MileageExpense[]): {
  totalDistance: number;
  totalAmount: number;
  byMonth: Record<string, { distance: number; amount: number }>;
} {
  const report = {
    totalDistance: 0,
    totalAmount: 0,
    byMonth: {} as Record<string, { distance: number; amount: number }>,
  };

  expenses.forEach((expense) => {
    const amount = calculateMileageExpense(expense.distance, expense.rate);
    const month = expense.date.toLocaleString('default', { month: 'long', year: 'numeric' });

    report.totalDistance += expense.distance;
    report.totalAmount += amount;

    if (!report.byMonth[month]) {
      report.byMonth[month] = { distance: 0, amount: 0 };
    }

    report.byMonth[month].distance += expense.distance;
    report.byMonth[month].amount += amount;
  });

  return report;
}