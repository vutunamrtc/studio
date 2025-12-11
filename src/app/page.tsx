import OverviewCards from '@/components/dashboard/overview-cards';
import CategorySpendChart from '@/components/dashboard/category-spend-chart';
import RecentTransactions from '@/components/dashboard/recent-transactions';
import { getTransactions, getCategories } from '@/app/lib/data';

export default async function DashboardPage() {
  const transactions = await getTransactions();
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-headline font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Here's a summary of your financial activity.
        </p>
      </div>

      <OverviewCards transactions={transactions} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CategorySpendChart transactions={transactions} categories={categories} />
        <RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
}
