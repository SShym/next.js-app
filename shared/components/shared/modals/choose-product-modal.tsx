'use client'

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { IProduct } from '@/@types/prisma';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';
import { useCartStore } from '@/shared/store/cart';
import toast from 'react-hot-toast';

interface Props {
  className?: string;
  product: IProduct;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();

  const firstItem = product.items[0];
  const isPizza = Boolean(product.ingredients[0]);

  const { addCartItem, loading } = useCartStore()

  const handleSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(`Товар "${product.name}" добавлен в корзину`);
      router.back();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn(
        'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
        className,
      )}>
        {isPizza 
          ? <ChoosePizzaForm 
              onSubmit={handleSubmit} 
              imageUrl={product.imageUrl} 
              items={product.items} 
              name={product.name} 
              ingredients={product.ingredients} 
              loading={loading}
            />
          : <ChooseProductForm 
              onSubmit={handleSubmit} 
              imageUrl={product.imageUrl} 
              items={product.items} 
              name={product.name} 
              loading={loading}
            />
        }
      </DialogContent>
    </Dialog>
  )
}