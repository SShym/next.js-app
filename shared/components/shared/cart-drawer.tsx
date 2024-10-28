'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/shared/components/ui/sheet"
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import { CartDdrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store/cart';
import { ProductSize, PizzaType } from '@/shared/constants/pizza';

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  const { fetchCartItems, totalAmount, updateItemQuantity, removeCartItem, items, loading } = useCartStore();

  React.useEffect(() => {
    fetchCartItems();
  }, [])

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      {/* <SheetTrigger>Open</SheetTrigger> */}
      <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
        <SheetHeader>
          <SheetTitle>Товары в корзине:</SheetTitle>
          <SheetDescription>
            В корзине {items?.length} товар<span>{items?.length > 1 && 'a'}</span>
          </SheetDescription>
        </SheetHeader>

        <div className='-mx-6 mt-5 p-1 overflow-auto flex-1'>
          {items?.map((item) => (
            <CartDdrawerItem
              loading={loading}
              key={item.id} 
              details={getCartItemDetails(
                item.ingredients,
                item.pizzaType as PizzaType,
                item.productSize as ProductSize,
              )}
              id={item.id} 
              imageUrl={item.imageUrl} 
              name={item.name} 
              price={item.price} 
              quantity={item.quantity}    
              onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}    
              onClickRemove={() => removeCartItem(item.id)}       
            />
          ))}
        </div>

        <SheetFooter className='-mx-6 bg-white p-8 flex items-center'>
          <div className='w-full'>
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>
            <Link href="/cart">
              <Button
                type="submit"
                className="w-full h-12 text-base"
                loading={loading}>
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
