const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data', 'finance.db');
const db = new Database(dbPath);

console.log('=== CATEGORIES ===');
const categories = db.prepare('SELECT * FROM categories').all();
console.log(`Total categories: ${categories.length}`);
categories.forEach(cat => {
    console.log(`- ${cat.id}: ${cat.name} (${cat.icon})`);
});

console.log('\n=== TRANSACTIONS ===');
const transactions = db.prepare('SELECT * FROM transactions').all();
console.log(`Total transactions: ${transactions.length}`);
transactions.forEach(txn => {
    console.log(`- ${txn.id}: ${txn.description} - ${txn.amount} (${txn.type})`);
});

db.close();
