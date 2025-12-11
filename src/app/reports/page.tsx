import { getCategories, getTransactions } from '@/app/lib/data';
import MonthlySummaryChart from '@/components/reports/monthly-summary-chart';

export default async function ReportsPage() {
  const transactions = await getTransactions();
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-headline font-bold tracking-tight">
          Reports
        </h1>
        <p className="text-muted-foreground">
          Analyze your spending habits with detailed reports.
        </p>
      </div>
      <MonthlySummaryChart transactions={transactions} />
    </div>
  );
}
