import {
    initDatabase,
    getAllCategories,
    createCategory,
    createTransaction
} from './db';

// Dữ liệu categories mẫu
const defaultCategories = [
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

let isSeeded = false;

// Khởi tạo database với dữ liệu mẫu
export function seedDatabase() {
    // Tránh seed nhiều lần
    if (isSeeded) {
        return;
    }

    try {
        console.log('Initializing database...');
        initDatabase();

        // Kiểm tra xem đã có categories chưa
        const existingCategories = getAllCategories();

        if (existingCategories.length === 0) {
            console.log('Seeding categories...');
            const categoryMap: Record<string, string> = {};

            defaultCategories.forEach((cat) => {
                const created = createCategory(cat);
                categoryMap[cat.name] = created.id;
                console.log(`Created category: ${cat.name} (${created.id})`);
            });

            // Tạo một số transactions mẫu
            console.log('Seeding transactions...');
            const sampleTransactions = [
                {
                    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    description: 'Weekly groceries',
                    amount: 75.6,
                    type: 'expense' as const,
                    category: 'Groceries',
                    categoryId: categoryMap['Groceries']
                },
                {
                    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                    description: 'Monthly salary',
                    amount: 3000,
                    type: 'income' as const,
                    category: 'Salary',
                    categoryId: categoryMap['Salary']
                },
                {
                    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                    description: 'Gasoline',
                    amount: 40,
                    type: 'expense' as const,
                    category: 'Transport',
                    categoryId: categoryMap['Transport']
                },
                {
                    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                    description: 'Movie tickets',
                    amount: 25,
                    type: 'expense' as const,
                    category: 'Entertainment',
                    categoryId: categoryMap['Entertainment']
                },
                {
                    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                    description: 'Rent payment',
                    amount: 1200,
                    type: 'expense' as const,
                    category: 'Housing',
                    categoryId: categoryMap['Housing']
                },
            ];

            sampleTransactions.forEach((txn) => {
                const created = createTransaction(txn);
                console.log(`Created transaction: ${txn.description} (${created.id})`);
            });

            console.log('Database seeding completed!');
        } else {
            console.log('Database already has data. Skipping seed.');
        }

        isSeeded = true;
    } catch (error) {
        console.error('Error seeding database:', error);
        isSeeded = true; // Đánh dấu đã thử seed để tránh lặp lại
    }
}
