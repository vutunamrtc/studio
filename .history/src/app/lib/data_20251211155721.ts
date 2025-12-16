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
import { seedDatabase } from '@/lib/seed';

// Khởi tạo database khi import lần đầu (chỉ trên server)
if (typeof window === 'undefined') {
  seedDatabase();
}

// Helper để kiểm tra xem có đang chạy trên server không
const isServer = typeof window === 'undefined';

// Helper để lấy base URL
function getBaseUrl() {
  if (isServer) {
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
  }
  return '';
}

// ==================== TRANSACTIONS ====================

export async function getTransactions(): Promise<Transaction[]> {
  // Nếu đang ở server, gọi trực tiếp database
  if (isServer) {
    return dbGetAllTransactions();
  }

  // Nếu ở client, gọi API
  const response = await fetch(`${getBaseUrl()}/api/transactions`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return response.json();
}

export async function addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
  if (isServer) {
    return dbCreateTransaction(transaction);
  }

  const response = await fetch(`${getBaseUrl()}/api/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    throw new Error('Failed to add transaction');
  }

  return response.json();
}

export async function updateTransaction(id: string, transaction: Partial<Transaction>): Promise<void> {
  if (isServer) {
    dbUpdateTransaction(id, transaction);
    return;
  }

  const response = await fetch(`${getBaseUrl()}/api/transactions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    throw new Error('Failed to update transaction');
  }
}

export async function deleteTransaction(id: string): Promise<void> {
  if (isServer) {
    dbDeleteTransaction(id);
    return;
  }

  const response = await fetch(`${getBaseUrl()}/api/transactions/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete transaction');
  }
}

// ==================== CATEGORIES ====================

export async function getCategories(): Promise<Category[]> {
  if (isServer) {
    return dbGetAllCategories();
  }

  const response = await fetch(`${getBaseUrl()}/api/categories`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
}

export async function addCategory(category: Omit<Category, 'id' | 'icon' | 'color'>): Promise<Category> {
  const fullCategory = {
    ...category,
    icon: 'MoreHorizontal',
    color: 'hsl(0 0% 70%)'
  };

  if (isServer) {
    return dbCreateCategory(fullCategory);
  }

  const response = await fetch(`${getBaseUrl()}/api/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fullCategory),
  });

  if (!response.ok) {
    throw new Error('Failed to add category');
  }

  return response.json();
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<void> {
  if (isServer) {
    dbUpdateCategory(id, category);
    return;
  }

  const response = await fetch(`${getBaseUrl()}/api/categories/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error('Failed to update category');
  }
}

export async function deleteCategory(id: string): Promise<void> {
  if (isServer) {
    dbDeleteCategory(id);
    return;
  }

  const response = await fetch(`${getBaseUrl()}/api/categories/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete category');
  }
}