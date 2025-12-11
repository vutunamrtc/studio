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

const BudgetRecommendationsInputSchema = z.string().describe('Một chuỗi JSON đại diện cho lịch sử giao dịch của người dùng.');
export type BudgetRecommendationsInput = z.infer<typeof BudgetRecommendationsInputSchema>;

const BudgetRecommendationsOutputSchema = z.object({
  recommendedBudgets: z.record(z.string(), z.number()).describe('Một bản đồ từ danh mục đến số tiền ngân sách được đề xuất.'),
  summary: z.string().describe('Tóm tắt các đề xuất ngân sách và lý do.'),
});
export type BudgetRecommendationsOutput = z.infer<typeof BudgetRecommendationsOutputSchema>;

export async function getBudgetRecommendations(transactionHistory: BudgetRecommendationsInput): Promise<BudgetRecommendationsOutput> {
  return budgetingRecommendationsFlow(transactionHistory);
}

const prompt = ai.definePrompt({
  name: 'budgetingRecommendationsPrompt',
  input: {schema: BudgetRecommendationsInputSchema},
  output: {schema: BudgetRecommendationsOutputSchema},
  prompt: `Bạn là một cố vấn tài chính cá nhân. Phân tích lịch sử giao dịch sau đây và cung cấp các đề xuất ngân sách được cá nhân hóa cho từng danh mục. Phản hồi bằng tiếng Việt.

Lịch sử giao dịch: {{{transactionHistory}}}

Cung cấp một đối tượng JSON với số tiền ngân sách được đề xuất cho mỗi danh mục và một bản tóm tắt ngắn gọn về các đề xuất của bạn. Trường "recommendedBudgets" phải là một bản đồ từ tên danh mục đến ngân sách được đề xuất (dưới dạng số). Các danh mục PHẢI khớp với tên các danh mục như chúng xuất hiện trong lịch sử giao dịch.`,
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
      throw new Error('JSON không hợp lệ được cung cấp cho lịch sử giao dịch.');
    }
    const {output} = await prompt(transactionHistory);
    return output!;
  }
);
