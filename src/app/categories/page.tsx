import { getCategories } from '@/app/lib/data';
import CategoryCard from '@/components/categories/category-card';
import CategoryFormDialog from '@/components/categories/category-form-dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-headline font-bold tracking-tight">
            Categories
          </h1>
          <p className="text-muted-foreground">
            Organize your transactions by creating and managing categories.
          </p>
        </div>
        <CategoryFormDialog>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Category
            </Button>
        </CategoryFormDialog>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
