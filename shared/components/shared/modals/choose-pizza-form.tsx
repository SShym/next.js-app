import { cn } from '@/shared/lib/utils';
import React from 'react';
import { ProductImage } from '../product-image';
import { Title } from '../title';
import { Button } from '@/shared/components/ui';
import { GroupVariants } from '../group-variants';
import { mapPizzaType, PizzaType, ProductSize } from '@/shared/constants/pizza';
import { IngredientItem } from '../ingredient-item';
import { Ingredient, ProductItem } from '@prisma/client';
import { calcTotalPizzaPrice } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks/use-pizza-options';

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading: boolean,
  onSubmit: (itemId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({ 
  className, 
  imageUrl, 
  name, 
  ingredients,
  items,
  loading,
  onSubmit,
}) => {
  const { size, currentItemId, selectedIngredients, availableSizes, availableTypes, isPizza, type, setSize, setType, addIngredient } = usePizzaOptions(items);
  const totalPrice = calcTotalPizzaPrice(size, items, type, ingredients, selectedIngredients);

  const textDetails = `${size} см, традиционное тесто ${mapPizzaType[type]} пицца`

  const handleClickAdd = () => {
    onSubmit(Number(currentItemId), Array.from(selectedIngredients));
  }

  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage 
        isPizza={isPizza} 
        imageUrl={imageUrl} 
        size={size} 
      />
      <div className='w-[490px] bg-[#FCFCFC] p-7'>
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className='text-gray-400'>{textDetails}</p>
        <GroupVariants items={availableSizes} value={String(size)} onClick={value => setSize(Number(value) as ProductSize)} />
        <GroupVariants items={availableTypes} value={String(type)} onClick={value => setType(Number(value) as PizzaType)} className='mt-2' />

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
          <div className='grid grid-cols-3 gap-3'>
            {ingredients?.map((ingredient) => (
              <IngredientItem 
                key={ingredient.id}
                price={ingredient.price}
                name={ingredient.name}
                imageUrl={ingredient.imageUrl}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button loading={loading} onClick={handleClickAdd} className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
          Добавить в корзину за {totalPrice} р
        </Button>
      </div>
    </div>
  )
}