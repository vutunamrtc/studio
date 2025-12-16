const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data', 'finance.db');
const db = new Database(dbPath);

console.log('Initializing database...');

// Enable WAL mode
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL
  )
`);

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

// Create indexes
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
  CREATE INDEX IF NOT EXISTS idx_transactions_categoryId ON transactions(categoryId);
  CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
`);

console.log('Tables created successfully.');

// Check if already seeded
const categoryCount = db.prepare('SELECT COUNT(*) as count FROM categories').get();
if (categoryCount.count > 0) {
    console.log('Database already has data. Skipping seed.');
    db.close();
    process.exit(0);
}

console.log('Seeding categories...');

const categories = [
    { name: 'Groceries', icon: 'ShoppingCart', color: 'hsl(var(--chart-1))' },
    { name: 'Transport', icon: 'Car', color: 'hsl(var(--chart-2))' },
    { name: 'Housing', icon: 'Home', color: 'hsl(var(--chart-3))' },
    { name: 'Health', icon: 'HeartPulse', color: 'hsl(var(--chart-4))' },
    { name: 'Entertainment', icon: 'Film', color: 'hsl(var(--chart-5))' },
    { name: 'Gifts', icon: 'Gift', color: 'hsl(180 70% 40%)' },
    { name: 'Salary', icon: 'Landmark', color: 'hsl(120 70% 40%)' },
    { name: 'Savings', icon: 'PiggyBank', color: 'hsl(140 70% 40%)' },
    { name: 'Other', icon: 'MoreHorizontal', color: 'hsl(0 0% 70%)' },
];

const insertCategory = db.prepare(`
  INSERT INTO categories (id, name, icon, color)
  VALUES (?, ?, ?, ?)
`);

const categoryMap = {};
categories.forEach((cat, index) => {
    const id = `cat-${Date.now()}-${index}`;
    insertCategory.run(id, cat.name, cat.icon, cat.color);
    categoryMap[cat.name] = id;
    console.log(`Created category: ${cat.name} (${id})`);
});

console.log('Seeding transactions...');

const transactions = [
    {
        description: 'Weekly groceries',
        amount: 75.6,
        type: 'expense',
        category: 'Groceries',
        daysAgo: 2
    },
    {
        description: 'Monthly salary',
        amount: 3000,
        type: 'income',
        category: 'Salary',
        daysAgo: 1
    },
    {
        description: 'Gasoline',
        amount: 40,
        type: 'expense',
        category: 'Transport',
        daysAgo: 3
    },
    {
        description: 'Movie tickets',
        amount: 25,
        type: 'expense',
        category: 'Entertainment',
        daysAgo: 4
    },
    {
        description: 'Rent payment',
        amount: 1200,
        type: 'expense',
        category: 'Housing',
        daysAgo: 5
    },
    {
        description: 'Pharmacy',
        amount: 15.25,
        type: 'expense',
        category: 'Health',
        daysAgo: 6
    },
    {
        description: 'Dinner out',
        amount: 55,
        type: 'expense',
        category: 'Groceries',
        daysAgo: 7
    },
];

const insertTransaction = db.prepare(`
  INSERT INTO transactions (id, date, description, amount, type, category, categoryId)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

transactions.forEach((txn, index) => {
    const id = `txn-${Date.now()}-${index}`;
    const date = new Date(Date.now() - txn.daysAgo * 24 * 60 * 60 * 1000).toISOString();
    const categoryId = categoryMap[txn.category];

    insertTransaction.run(
        id,
        date,
        txn.description,
        txn.amount,
        txn.type,
        txn.category,
        categoryId
    );

    console.log(`Created transaction: ${txn.description} (${id})`);
});

console.log('Database seeding completed!');

// Verify
const finalCategoryCount = db.prepare('SELECT COUNT(*) as count FROM categories').get();
const finalTransactionCount = db.prepare('SELECT COUNT(*) as count FROM transactions').get();

console.log(`\nFinal counts:`);
console.log(`- Categories: ${finalCategoryCount.count}`);
console.log(`- Transactions: ${finalTransactionCount.count}`);

db.close();
