'use client';

import type { Category } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import CategoryFormDialog from './category-form-dialog';
import dynamic from 'next/dynamic';
import { LucideProps } from 'lucide-react';
import React from 'react';

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = dynamic<LucideProps>(() => import('lucide-react').then(mod => mod[category.icon as keyof typeof mod] || mod.MoreHorizontal));
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: category.color, opacity: 0.2 }}
          >
            <Icon className="h-6 w-6" style={{ color: category.color }} />
          </div>
          <span className="font-medium">{category.name}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Mở menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setDialogOpen(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Sửa
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
      <CategoryFormDialog category={category} open={dialogOpen} onOpenChange={setDialogOpen}>
        {/* This dialog is now controlled by state and doesn't need a trigger child */}
      </CategoryFormDialog>
    </Card>
  );
}
