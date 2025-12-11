'use client';

import type { Transaction, Category } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import type { ChartConfig } from '@/components/ui/chart';

type CategorySpendChartProps = {
  transactions: Transaction[];
  categories: Category[];
};

export default function CategorySpendChart({
  transactions,
  categories,
}: CategorySpendChartProps) {
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');

  const spendingByCategory = expenseTransactions.reduce((acc, transaction) => {
    const categoryName =
      categories.find((c) => c.id === transaction.categoryId)?.name || 'Khác';
    if (!acc[categoryName]) {
      acc[categoryName] = 0;
    }
    acc[categoryName] += transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(spendingByCategory)
    .map(([name, value]) => ({
      name,
      value,
      fill: categories.find(c => c.name === name)?.color || 'hsl(var(--muted))'
    }))
    .sort((a, b) => b.value - a.value);

  const chartConfig = chartData.reduce((acc, item) => {
    acc[item.name] = { label: item.name, color: item.fill };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chi tiêu theo danh mục</CardTitle>
        <CardDescription>
          Phân tích chi tiêu của bạn theo danh mục trong tháng này.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
