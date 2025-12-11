'use client';

import type { Transaction, Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { addTransaction, updateTransaction } from '@/app/lib/data';
import { useToast } from '@/hooks/use-toast';
import React from 'react';

type TransactionFormSheetProps = {
  children: React.ReactNode;
  categories: Category[];
  transaction?: Transaction;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const formSchema = z.object({
  type: z.enum(['expense', 'income']),
  amount: z.coerce.number().positive('Amount must be positive.'),
  categoryId: z.string().min(1, 'Please select a category.'),
  date: z.date(),
  description: z.string().min(1, 'Description is required.'),
});

export default function TransactionFormSheet({
  children,
  categories,
  transaction,
  open,
  onOpenChange,
}: TransactionFormSheetProps) {
  const { toast } = useToast();
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isEditing = !!transaction;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: transaction?.type || 'expense',
      amount: transaction?.amount || 0,
      categoryId: transaction?.categoryId || '',
      date: transaction ? new Date(transaction.date) : new Date(),
      description: transaction?.description || '',
    },
  });

  const isControlled = open !== undefined && onOpenChange !== undefined;
  const currentOpen = isControlled ? open : internalOpen;
  const setCurrentOpen = isControlled ? onOpenChange : setInternalOpen;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (isEditing) {
        await updateTransaction(transaction.id, {
            ...values,
            date: values.date.toISOString(),
            category: categories.find(c => c.id === values.categoryId)?.name || '',
        });
        toast({ title: 'Success', description: 'Transaction updated.' });
      } else {
        await addTransaction({
            ...values,
            date: values.date.toISOString(),
            category: categories.find(c => c.id === values.categoryId)?.name || '',
        });
        toast({ title: 'Success', description: 'Transaction added.' });
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
      form.reset({
        type: transaction?.type || 'expense',
        amount: transaction?.amount || 0,
        categoryId: transaction?.categoryId || '',
        date: transaction ? new Date(transaction.date) : new Date(),
        description: transaction?.description || '',
      });
    }
  }, [currentOpen, transaction, form]);

  return (
    <Sheet open={currentOpen} onOpenChange={setCurrentOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{isEditing ? 'Edit' : 'Add'} Transaction</SheetTitle>
          <SheetDescription>
            {isEditing ? 'Update the details of your transaction.' : 'Enter the details of your new transaction.'}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="expense" />
                        </FormControl>
                        <FormLabel className="font-normal">Expense</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="income" />
                        </FormControl>
                        <FormLabel className="font-normal">Income</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="$0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g. Weekly groceries" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit">Save Transaction</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
