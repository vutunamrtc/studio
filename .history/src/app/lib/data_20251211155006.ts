import type { Transaction, Category } from '@/lib/types';
import {
  getAllTransactions,
  getAllCategories,
  createTransaction as dbCreateTransaction,
  createCategory as dbCreateCategory,
  updateTransaction as dbUpdateTransaction,
  updateCategory as dbUpdateCategory,
  deleteTransaction as dbDeleteTransaction,
  deleteCategory as dbDeleteCategory,
} from '@/lib/db';
import { seedDatabase } from '@/lib/seed';

// Khởi tạo database khi import lần đầu
if (typeof window === 'undefined') {
  // Chỉ chạy trên server-side
  seedDatabase();
}

// ==================== TRANSACTIONS ====================

export async function getTransactions(): Promise<Transaction[]> {
  // Simulate network delay để giữ nguyên behavior
  await new Promise(resolve => setTimeout(resolve, 50));
  return getAllTransactions();
}

export async function addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return dbCreateTransaction(transaction);
}

export async function updateTransaction(id: string, transaction: Partial<Transaction>): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 50));
  dbUpdateTransaction(id, transaction);
}

export async function deleteTransaction(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 50));
  dbDeleteTransaction(id);
}

// ==================== CATEGORIES ====================

export async function getCategories(): Promise<Category[]> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return getAllCategories();
}

export async function addCategory(category: Omit<Category, 'id' | 'icon' | 'color'>): Promise<Category> {
  await new Promise(resolve => setTimeout(resolve, 50));
  // Thêm icon và color mặc định
  return dbCreateCategory({
    ...category,
    icon: 'MoreHorizontal',
    color: 'hsl(0 0% 70%)'
  });
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 50));
  dbUpdateCategory(id, category);
}

export async function deleteCategory(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 50));
  dbDeleteCategory(id);
}