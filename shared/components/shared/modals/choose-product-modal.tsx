'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { IProduct } from '@/@types/prisma';
import { useRouter } from 'next/navigation';
import { ProductForm } from '../product-form';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';

interface Props {
  className?: string;
  product: IProduct;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn(
        'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
        className,
      )}>
        <ProductForm product={product} />
      </DialogContent>
    </Dialog>
  )
}