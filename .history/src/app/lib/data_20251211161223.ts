import type { Transaction, Category } from '@/lib/types';

// ==================== TRANSACTIONS ====================

export async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch('/api/transactions', {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return response.json();
}

export async function addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
  const response = await fetch('/api/transactions', {
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
  const response = await fetch(`/api/transactions/${id}`, {
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
  const response = await fetch(`/api/transactions/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete transaction');
  }
}

// ==================== CATEGORIES ====================

export async function getCategories(): Promise<Category[]> {
  const response = await fetch('/api/categories', {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
}

export async function addCategory(category: Omit<Category, 'id' | 'icon' | 'color'>): Promise<Category> {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...category,
      icon: 'MoreHorizontal',
      color: 'hsl(0 0% 70%)'
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add category');
  }

  return response.json();
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<void> {
  const response = await fetch(`/api/categories/${id}`, {
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
  const response = await fetch(`/api/categories/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete category');
  }
}