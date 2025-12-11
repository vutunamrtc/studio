import type { BudgetRecommendationsOutput } from '@/ai/flows/budgeting-recommendations';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

type BudgetRecommendationsProps = {
  recommendations: BudgetRecommendationsOutput;
};

export default function BudgetRecommendations({
  recommendations,
}: BudgetRecommendationsProps) {
  const { summary, recommendedBudgets } = recommendations;

  const totalBudget = Object.values(recommendedBudgets).reduce(
    (sum, amount) => sum + amount,
    0
  );
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Kế hoạch ngân sách AI của bạn</h3>
        <p className="text-sm text-muted-foreground mt-1">{summary}</p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Danh mục</TableHead>
              <TableHead className="text-right">Ngân sách đề xuất</TableHead>
              <TableHead className="w-[150px]">Tỷ lệ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(recommendedBudgets)
              .sort(([, a], [, b]) => b - a)
              .map(([category, amount]) => {
                const percentage = totalBudget > 0 ? (amount / totalBudget) * 100 : 0;
                return (
                  <TableRow key={category}>
                    <TableCell className="font-medium">{category}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(amount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={percentage} className="h-2" />
                        <span className="text-xs text-muted-foreground w-10 text-right">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
       <div className="text-right font-bold text-lg">
          Tổng ngân sách hàng tháng: {formatCurrency(totalBudget)}
        </div>
    </div>
  );
}
