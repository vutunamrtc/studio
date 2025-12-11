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
        title: 'Error Generating Recommendations',
        description: 'There was an issue getting your budget recommendations. Please try again.',
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
          AI Budgeting Tool
        </h1>
        <p className="text-muted-foreground">
          Get personalized budget recommendations based on your spending habits.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[200px]">
          {!recommendations && !loading && (
            <>
              <h3 className="text-lg font-semibold">
                Ready for your smart budget?
              </h3>
              <p className="text-muted-foreground max-w-md">
                Our AI will analyze your transaction history to create a
                personalized budget plan just for you.
              </p>
              <Button onClick={handleGenerate} disabled={loading}>
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate My Budget'
                )}
              </Button>
            </>
          )}

          {loading && (
             <div className="flex flex-col items-center gap-2">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Analyzing your spending...</p>
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
                    Re-generating...
                  </>
                ) : (
                  'Re-generate Budget'
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
