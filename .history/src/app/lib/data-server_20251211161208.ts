import 'server-only';
import type { Transaction, Category } from '@/lib/types';
import {
    getAllTransactions as dbGetAllTransactions,
    getAllCategories as dbGetAllCategories,
    createTransaction as dbCreateTransaction,
    createCategory as dbCreateCategory,
    updateTransaction as dbUpdateTransaction,
    updateCategory as dbUpdateCategory,
    deleteTransaction as dbDeleteTransaction,
    deleteCategory as dbDeleteCategory,
} from '@/lib/db';

// ==================== TRANSACTIONS ====================

export async function getTransactions(): Promise<Transaction[]> {
    return dbGetAllTransactions();
}

export async function addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    return dbCreateTransaction(transaction);
}

export async function updateTransaction(id: string, transaction: Partial<Transaction>): Promise<void> {
    dbUpdateTransaction(id, transaction);
}

export async function deleteTransaction(id: string): Promise<void> {
    dbDeleteTransaction(id);
}

// ==================== CATEGORIES ====================

export async function getCategories(): Promise<Category[]> {
    return dbGetAllCategories();
}

export async function addCategory(category: Omit<Category, 'id' | 'icon' | 'color'>): Promise<Category> {
    return dbCreateCategory({
        ...category,
        icon: 'MoreHorizontal',
        color: 'hsl(0 0% 70%)'
    });
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<void> {
    dbUpdateCategory(id, category);
}

export async function deleteCategory(id: string): Promise<void> {
    dbDeleteCategory(id);
}
