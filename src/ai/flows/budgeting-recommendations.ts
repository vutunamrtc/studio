'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized budget recommendations based on past spending habits.
 *
 * The flow takes a JSON string of transaction history as input and returns budget recommendations.
 * It exports:
 * - `getBudgetRecommendations`: An async function that takes transaction history as input and returns budget recommendations.
 * - `BudgetRecommendationsInput`: The TypeScript type definition for the input to the flow.
 * - `BudgetRecommendationsOutput`: The TypeScript type definition for the output of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BudgetRecommendationsInputSchema = z.string().describe('A JSON string representing the user transaction history.');
export type BudgetRecommendationsInput = z.infer<typeof BudgetRecommendationsInputSchema>;

const BudgetRecommendationsOutputSchema = z.object({
  recommendedBudgets: z.record(z.string(), z.number()).describe('A map of category to recommended budget amount.'),
  summary: z.string().describe('A summary of the budget recommendations and rationale.'),
});
export type BudgetRecommendationsOutput = z.infer<typeof BudgetRecommendationsOutputSchema>;

export async function getBudgetRecommendations(transactionHistory: BudgetRecommendationsInput): Promise<BudgetRecommendationsOutput> {
  return budgetingRecommendationsFlow(transactionHistory);
}

const prompt = ai.definePrompt({
  name: 'budgetingRecommendationsPrompt',
  input: {schema: BudgetRecommendationsInputSchema},
  output: {schema: BudgetRecommendationsOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the following transaction history and provide personalized budget recommendations for each category.

Transaction History: {{{transactionHistory}}}

Provide a JSON object with recommended budget amounts for each category and a brief summary of your recommendations.  The "recommendedBudgets" field should be a map from category name to the recommended budget (as a number). The categories MUST match the names of categories as they appear in the transaction history.`,
});

const budgetingRecommendationsFlow = ai.defineFlow(
  {
    name: 'budgetingRecommendationsFlow',
    inputSchema: BudgetRecommendationsInputSchema,
    outputSchema: BudgetRecommendationsOutputSchema,
  },
  async transactionHistory => {
    try {
      JSON.parse(transactionHistory);
    } catch (e) {
      throw new Error('Invalid JSON provided for transaction history.');
    }
    const {output} = await prompt(transactionHistory);
    return output!;
  }
);
