import type { LucideIcon } from "lucide-react";

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  categoryId: string;
};

export type Category = {
  id:string;
  name: string;
  icon: string;
  color: string;
};