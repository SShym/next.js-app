'use client';

import { IProduct } from '@/@types/prisma';
import { useCartStore } from '@/shared/store/cart';
import React from 'react';
import { ChoosePizzaForm } from './modals/choose-pizza-form';
import { ChooseProductForm } from './modals/choose-product-form';
import toast from 'react-hot-toast';

interface Props {
  product: IProduct;
  _onSubmit?: VoidFunction;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({ product, _onSubmit, className }) => {
  const { addCartItem, loading } = useCartStore();
  
  const firstItem = product.items[0];
  const isPizza = Boolean(product.ingredients[0]);

  const handleSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      _onSubmit?.();
      toast.success(`Товар "${product.name}" добавлен в корзину`);
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };

  if(isPizza) {
    return (
      <ChoosePizzaForm 
        onSubmit={handleSubmit} 
        imageUrl={product.imageUrl} 
        items={product.items} 
        name={product.name} 
        ingredients={product.ingredients} 
        loading={loading}
      />
    )
  } else {
    return (
      <ChooseProductForm 
        onSubmit={handleSubmit} 
        imageUrl={product.imageUrl} 
        items={product.items} 
        name={product.name} 
        loading={loading}
      />
    )
  }
}