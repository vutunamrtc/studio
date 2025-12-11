'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import { getBudgetingRecommendations } from './actions';
import BudgetRecommendations from '@/components/budgeting/budget-recommendations';
import type { BudgetRecommendationsOutput } from '@/ai/flows/budgeting-recommendations';
import { useToast } from '@/hooks/use-toast';

export default function BudgetingPage() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] =
    useState<BudgetRecommendationsOutput | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    setRecommendations(null);
    try {
      const result = await getBudgetingRecommendations();
      setRecommendations(result);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Lỗi tạo đề xuất',
        description: 'Có sự cố khi lấy đề xuất ngân sách của bạn. Vui lòng thử lại.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-headline font-bold tracking-tight">
          Công cụ lập ngân sách AI
        </h1>
        <p className="text-muted-foreground">
          Nhận đề xuất ngân sách được cá nhân hóa dựa trên thói quen chi tiêu của bạn.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[200px]">
          {!recommendations && !loading && (
            <>
              <h3 className="text-lg font-semibold">
                Sẵn sàng cho ngân sách thông minh của bạn?
              </h3>
              <p className="text-muted-foreground max-w-md">
                AI của chúng tôi sẽ phân tích lịch sử giao dịch của bạn để tạo
                một kế hoạch ngân sách được cá nhân hóa chỉ dành cho bạn.
              </p>
              <Button onClick={handleGenerate} disabled={loading}>
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  'Tạo ngân sách của tôi'
                )}
              </Button>
            </>
          )}

          {loading && (
             <div className="flex flex-col items-center gap-2">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Đang phân tích chi tiêu của bạn...</p>
             </div>
          )}

          {recommendations && (
            <div className="w-full text-left">
              <BudgetRecommendations recommendations={recommendations} />
              <div className='text-center mt-6'>
                <Button onClick={handleGenerate} disabled={loading} variant="outline">
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Đang tạo lại...
                  </>
                ) : (
                  'Tạo lại ngân sách'
                )}
              </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
