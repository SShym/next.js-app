import { cn } from '@/shared/lib/utils';
import { ProductItem } from '@prisma/client';
import React from 'react';
import { ProductImage } from '../product-image';
import { Title } from '../title';
import { Button } from '@/shared/components/ui';
import { usePizzaOptions } from '@/shared/hooks/use-pizza-options';
import { GroupVariants } from '../group-variants';
import { ProductSize } from '@/shared/constants/pizza';
import { calcTotalPizzaPrice } from '@/shared/lib';

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  items: ProductItem[];
  loading: boolean;
  onSubmit: (id: number) => void;
}

export const ChooseProductForm: React.FC<Props> = ({ 
  className, 
  imageUrl, 
  name,
  items,
  loading,
  onSubmit
}) => {
  const { size, availableSizes, setSize, currentItemId } = usePizzaOptions(items);
  const handleClickAdd = () => {
    onSubmit(Number(currentItemId));
  };

  const totalPrice = calcTotalPizzaPrice(size, items);

  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage imageUrl={imageUrl} size={30} />
      <div className='w-[490px] bg-[#FCFCFC] p-7'>
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className='text-gray-400'></p>
        <GroupVariants 
          items={availableSizes} 
          value={String(size)} 
          onClick={value => setSize(Number(value) as ProductSize)} 
        />

        <Button loading={loading} onClick={handleClickAdd} className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
          Добавить в корзину за {totalPrice} р
        </Button>
      </div>
    </div>
  )
}