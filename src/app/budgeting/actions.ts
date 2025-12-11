'use server';

import { getBudgetRecommendations as getBudgetRecommendationsFlow } from '@/ai/flows/budgeting-recommendations';
import { getTransactions } from '@/app/lib/data';

export async function getBudgetingRecommendations() {
  const transactions = await getTransactions();

  const transactionHistory = transactions.map(t => ({
    date: t.date,
    description: t.description,
    amount: t.amount,
    type: t.type,
    category: t.category,
  }));

  const input = JSON.stringify(transactionHistory);
  
  try {
    const recommendations = await getBudgetRecommendationsFlow(input);
    return recommendations;
  } catch (error) {
    console.error("Error in getBudgetingRecommendations action:", error);
    throw new Error("Failed to get budget recommendations from AI flow.");
  }
}
