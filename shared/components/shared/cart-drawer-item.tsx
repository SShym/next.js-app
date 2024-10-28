import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Trash2Icon } from 'lucide-react';
import { CountButton } from './count-button';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import  * as CartItem from './cart-item-details';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  loading: boolean,
  className?: string;
}

export const CartDdrawerItem: React.FC<Props> = ({ 
  className, 
  imageUrl,
  name, 
  price, 
  quantity, 
  details,
  loading,
  onClickRemove,
  onClickCountButton
}) => {
  
  return (
    <div className={cn('flex bg-white p-5 gap-6 rounded-lg mb-2', className)}>
      <CartItem.Image src={imageUrl} />
      <div className='flex-1'>
        <CartItem.Info name={name} details={details} />
        <hr className='my-3' />
        <div className='flex items-center justify-between'>
          <CountButton loading={loading} onClick={onClickCountButton} value={quantity} />
          <div className='flex items-center gap-3'>
            <CartItem.Price value={price} />
            <button disabled={loading} onClick={onClickRemove}>
              <Trash2Icon 
                className='text-gray-400 cursor-pointer hover:text-gray-600'
                size={16}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}