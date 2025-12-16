import 'server-only';
import Database from 'better-sqlite3';
import path from 'path';
import type { Transaction, Category } from '@/lib/types';

// Tạo kết nối database
const dbPath = path.join(process.cwd(), 'data', 'finance.db');
let db: Database.Database;

// Khởi tạo database
export function initDatabase() {
    if (!db) {
        db = new Database(dbPath);
        db.pragma('journal_mode = WAL');

        // Tạo bảng categories
        db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL
      )
    `);

        // Tạo bảng transactions
        db.exec(`
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
        category TEXT NOT NULL,
        categoryId TEXT NOT NULL,
        FOREIGN KEY (categoryId) REFERENCES categories(id)
      )
    `);

        // Tạo index để tăng tốc truy vấn
        db.exec(`
      CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
      CREATE INDEX IF NOT EXISTS idx_transactions_categoryId ON transactions(categoryId);
      CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
    `);
    }

    return db;
}

// Lấy database instance
export function getDatabase() {
    if (!db) {
        initDatabase();
    }
    return db;
}

// ==================== CATEGORIES ====================

export function getAllCategories(): Category[] {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM categories ORDER BY name');
    return stmt.all() as Category[];
}

export function getCategoryById(id: string): Category | undefined {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM categories WHERE id = ?');
    return stmt.get(id) as Category | undefined;
}

export function createCategory(category: Omit<Category, 'id'>): Category {
    const db = getDatabase();
    const id = `cat-${Date.now()}`;
    const stmt = db.prepare(`
    INSERT INTO categories (id, name, icon, color)
    VALUES (?, ?, ?, ?)
  `);

    stmt.run(id, category.name, category.icon, category.color);

    return { id, ...category };
}

export function updateCategory(id: string, category: Partial<Category>): void {
    const db = getDatabase();
    const fields: string[] = [];
    const values: any[] = [];

    if (category.name !== undefined) {
        fields.push('name = ?');
        values.push(category.name);
    }
    if (category.icon !== undefined) {
        fields.push('icon = ?');
        values.push(category.icon);
    }
    if (category.color !== undefined) {
        fields.push('color = ?');
        values.push(category.color);
    }

    if (fields.length > 0) {
        values.push(id);
        const stmt = db.prepare(`UPDATE categories SET ${fields.join(', ')} WHERE id = ?`);
        stmt.run(...values);
    }
}

export function deleteCategory(id: string): void {
    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
    stmt.run(id);
}

// ==================== TRANSACTIONS ====================

export function getAllTransactions(): Transaction[] {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM transactions ORDER BY date DESC');
    return stmt.all() as Transaction[];
}

export function getTransactionById(id: string): Transaction | undefined {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM transactions WHERE id = ?');
    return stmt.get(id) as Transaction | undefined;
}

export function getTransactionsByDateRange(startDate: string, endDate: string): Transaction[] {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM transactions WHERE date >= ? AND date <= ? ORDER BY date DESC');
    return stmt.all(startDate, endDate) as Transaction[];
}

export function getTransactionsByCategory(categoryId: string): Transaction[] {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM transactions WHERE categoryId = ? ORDER BY date DESC');
    return stmt.all(categoryId) as Transaction[];
}

export function getTransactionsByType(type: 'income' | 'expense'): Transaction[] {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM transactions WHERE type = ? ORDER BY date DESC');
    return stmt.all(type) as Transaction[];
}

export function createTransaction(transaction: Omit<Transaction, 'id'>): Transaction {
    const db = getDatabase();
    const id = `txn-${Date.now()}`;
    const stmt = db.prepare(`
    INSERT INTO transactions (id, date, description, amount, type, category, categoryId)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

    stmt.run(
        id,
        transaction.date,
        transaction.description,
        transaction.amount,
        transaction.type,
        transaction.category,
        transaction.categoryId
    );

    return { id, ...transaction };
}

export function updateTransaction(id: string, transaction: Partial<Transaction>): void {
    const db = getDatabase();
    const fields: string[] = [];
    const values: any[] = [];

    if (transaction.date !== undefined) {
        fields.push('date = ?');
        values.push(transaction.date);
    }
    if (transaction.description !== undefined) {
        fields.push('description = ?');
        values.push(transaction.description);
    }
    if (transaction.amount !== undefined) {
        fields.push('amount = ?');
        values.push(transaction.amount);
    }
    if (transaction.type !== undefined) {
        fields.push('type = ?');
        values.push(transaction.type);
    }
    if (transaction.category !== undefined) {
        fields.push('category = ?');
        values.push(transaction.category);
    }
    if (transaction.categoryId !== undefined) {
        fields.push('categoryId = ?');
        values.push(transaction.categoryId);
    }

    if (fields.length > 0) {
        values.push(id);
        const stmt = db.prepare(`UPDATE transactions SET ${fields.join(', ')} WHERE id = ?`);
        stmt.run(...values);
    }
}

export function deleteTransaction(id: string): void {
    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM transactions WHERE id = ?');
    stmt.run(id);
}

// ==================== STATISTICS ====================

export function getTotalByType(type: 'income' | 'expense'): number {
    const db = getDatabase();
    const stmt = db.prepare('SELECT SUM(amount) as total FROM transactions WHERE type = ?');
    const result = stmt.get(type) as { total: number | null };
    return result.total || 0;
}

export function getTotalByCategory(categoryId: string): number {
    const db = getDatabase();
    const stmt = db.prepare('SELECT SUM(amount) as total FROM transactions WHERE categoryId = ?');
    const result = stmt.get(categoryId) as { total: number | null };
    return result.total || 0;
}

export function getBalance(): number {
    const income = getTotalByType('income');
    const expense = getTotalByType('expense');
    return income - expense;
}
