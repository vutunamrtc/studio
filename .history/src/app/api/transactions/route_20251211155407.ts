import { NextResponse } from 'next/server';
import { getAllTransactions } from '@/lib/db';

export async function GET() {
    try {
        const transactions = getAllTransactions();
        return NextResponse.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }
}
