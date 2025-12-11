'use client';

import type { Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addCategory, updateCategory } from '@/app/lib/data';
import { useToast } from '@/hooks/use-toast';
import React from 'react';

type CategoryFormDialogProps = {
  children: React.ReactNode;
  category?: Category;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const formSchema = z.object({
  name: z.string().min(1, 'Category name is required.'),
});

export default function CategoryFormDialog({
  children,
  category,
  open,
  onOpenChange,
}: CategoryFormDialogProps) {
  const { toast } = useToast();
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isEditing = !!category;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || '',
    },
  });
  
  const isControlled = open !== undefined && onOpenChange !== undefined;
  const currentOpen = isControlled ? open : internalOpen;
  const setCurrentOpen = isControlled ? onOpenChange : setInternalOpen;


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (isEditing) {
        await updateCategory(category.id, values);
        toast({ title: 'Success', description: 'Category updated.' });
      } else {
        await addCategory(values);
        toast({ title: 'Success', description: 'Category added.' });
      }
      setCurrentOpen(false);
      form.reset();
      // In a real app, you'd revalidate the data here.
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive',
      });
    }
  }
  
  React.useEffect(() => {
    if(currentOpen) {
      form.reset({ name: category?.name || '' });
    }
  }, [currentOpen, category, form]);

  return (
    <Dialog open={currentOpen} onOpenChange={setCurrentOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} Category</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update your category name.' : 'Create a new category to organize your transactions.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Groceries" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save Category</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
