import { getTransactions, getCategories } from '@/app/lib/data';
import TransactionTable from '@/components/transactions/transaction-table';
import TransactionFormSheet from '@/components/transactions/transaction-form-sheet';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default async function TransactionsPage() {
  const transactions = await getTransactions();
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-headline font-bold tracking-tight">
            Giao dịch
          </h1>
          <p className="text-muted-foreground">
            Xem và quản lý tất cả các giao dịch của bạn.
          </p>
        </div>
        <TransactionFormSheet categories={categories}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Thêm giao dịch
          </Button>
        </TransactionFormSheet>
      </div>

      <TransactionTable transactions={transactions} categories={categories} />
    </div>
  );
}
