import type { Transaction, Category } from '@/lib/types';

const categories: Category[] = [
  { id: 'cat-1', name: 'Groceries', icon: 'ShoppingCart', color: 'hsl(var(--chart-1))' },
  { id: 'cat-2', name: 'Transport', icon: 'Car', color: 'hsl(var(--chart-2))' },
  { id: 'cat-3', name: 'Housing', icon: 'Home', color: 'hsl(var(--chart-3))' },
  { id: 'cat-4', name: 'Health', icon: 'HeartPulse', color: 'hsl(var(--chart-4))' },
  { id: 'cat-5', name: 'Entertainment', icon: 'Film', color: 'hsl(var(--chart-5))' },
  { id: 'cat-6', name: 'Gifts', icon: 'Gift', color: 'hsl(180 70% 40%)' },
  { id: 'cat-inc-1', name: 'Salary', icon: 'Landmark', color: 'hsl(120 70% 40%)' },
  { id: 'cat-inc-2', name: 'Savings', icon: 'PiggyBank', color: 'hsl(140 70% 40%)' },
  { id: 'cat-other', name: 'Other', icon: 'MoreHorizontal', color: 'hsl(0 0% 70%)' },
];

const transactions: Transaction[] = [
  { id: 'txn-1', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), description: 'Weekly groceries', amount: 75.6, type: 'expense', category: 'Groceries', categoryId: 'cat-1' },
  { id: 'txn-2', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), description: 'Monthly salary', amount: 3000, type: 'income', category: 'Salary', categoryId: 'cat-inc-1' },
  { id: 'txn-3', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), description: 'Gasoline', amount: 40, type: 'expense', category: 'Transport', categoryId: 'cat-2' },
  { id: 'txn-4', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), description: 'Movie tickets', amount: 25, type: 'expense', category: 'Entertainment', categoryId: 'cat-5' },
  { id: 'txn-5', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), description: 'Rent payment', amount: 1200, type: 'expense', category: 'Housing', categoryId: 'cat-3' },
  { id: 'txn-6', date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), description: 'Pharmacy', amount: 15.25, type: 'expense', category: 'Health', categoryId: 'cat-4' },
  { id: 'txn-7', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), description: 'Dinner out', amount: 55, type: 'expense', category: 'Groceries', categoryId: 'cat-1' },
  { id: 'txn-8', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), description: 'Bus fare', amount: 2.75, type: 'expense', category: 'Transport', categoryId: 'cat-2' },
  { id: 'txn-9', date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), description: 'Savings transfer', amount: 500, type: 'income', category: 'Savings', categoryId: 'cat-inc-2' },
  { id: 'txn-10', date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), description: 'Birthday gift for friend', amount: 30, type: 'expense', category: 'Gifts', categoryId: 'cat-6' },
  { id: 'txn-11', date: new Date('2024-04-20').toISOString(), description: 'Groceries', amount: 120, type: 'expense', category: 'Groceries', categoryId: 'cat-1' },
  { id: 'txn-12', date: new Date('2024-04-18').toISOString(), description: 'Internet Bill', amount: 60, type: 'expense', category: 'Housing', categoryId: 'cat-3' },
  { id: 'txn-13', date: new Date('2024-04-15').toISOString(), description: 'Freelance project', amount: 450, type: 'income', category: 'Salary', categoryId: 'cat-inc-1' },
];

export async function getTransactions(): Promise<Transaction[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getCategories(): Promise<Category[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return categories;
}

// In a real app, these functions would handle creating, updating, and deleting data.
// For now, they just log to the console.

export async function addTransaction(transaction: Omit<Transaction, 'id'>) {
  console.log('Adding transaction:', transaction);
  return { ...transaction, id: `txn-${Date.now()}` };
}

export async function updateTransaction(id: string, transaction: Partial<Transaction>) {
  console.log('Updating transaction:', id, transaction);
}

export async function deleteTransaction(id: string) {
  console.log('Deleting transaction:', id);
}

export async function addCategory(category: Omit<Category, 'id' | 'icon' | 'color'>) {
  console.log('Adding category:', category);
  return { ...category, id: `cat-${Date.now()}`, icon: 'MoreHorizontal', color: 'hsl(0 0% 70%)' };
}

export async function updateCategory(id: string, category: Partial<Category>) {
  console.log('Updating category:', id, category);
}

export async function deleteCategory(id: string) {
  console.log('Deleting category:', id);
}