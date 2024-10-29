import { prisma } from '@/prisma/prisma-client';
import { ChooseProductModal } from '@/shared/components/shared/modals/choose-product-modal';
import Spinner from '@/shared/components/ui/spinner';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }
  
  return (
    <ChooseProductModal product={product} />
  );
}