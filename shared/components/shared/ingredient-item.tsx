import { cn } from '@/shared/lib/utils';
import { CircleCheck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
}

export const IngredientItem: React.FC<Props> = ({
  className,
  active,
  price,
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        'flex justify-between border border-white items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
        { 'border border-primary': active },
        className,
      )}>
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      {/* <img alt={name} src={imageUrl} /> */}
      <span className="text-xs mb-3">{name}</span>
      <span className="font-bold">{price} ₽</span>
    </div>
  );
};
