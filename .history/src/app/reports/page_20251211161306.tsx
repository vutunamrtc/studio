import { getCategories, getTransactions } from '@/app/lib/data-server';
import MonthlySummaryChart from '@/components/reports/monthly-summary-chart';

export default async function ReportsPage() {
  const transactions = await getTransactions();
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-headline font-bold tracking-tight">
          Báo cáo
        </h1>
        <p className="text-muted-foreground">
          Phân tích thói quen chi tiêu của bạn với các báo cáo chi tiết.
        </p>
      </div>
      <MonthlySummaryChart transactions={transactions} />
    </div>
  );
}
