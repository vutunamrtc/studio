'use client';

import type { Transaction } from '@/lib/types';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
import type { ChartConfig } from '@/components/ui/chart';
import { format, startOfMonth } from 'date-fns';

type MonthlySummaryChartProps = {
  transactions: Transaction[];
};

export default function MonthlySummaryChart({
  transactions,
}: MonthlySummaryChartProps) {
  const monthlyData = transactions.reduce((acc, t) => {
    const month = format(startOfMonth(new Date(t.date)), 'MMM yyyy');
    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 };
    }
    acc[month][t.type] += t.amount;
    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  const chartData = Object.entries(monthlyData)
    .map(([month, values]) => ({ month, ...values }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  const chartConfig = {
    income: {
      label: 'Thu nhập',
      color: 'hsl(var(--chart-1))',
    },
    expense: {
      label: 'Chi tiêu',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tóm tắt hàng tháng</CardTitle>
        <CardDescription>Thu nhập so với chi tiêu theo thời gian</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `T${new Date(value).getMonth() + 1}`}
            />
             <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => `${value / 1000}k`}
              />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
