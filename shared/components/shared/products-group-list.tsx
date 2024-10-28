'use client'

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { ProductCard, Title } from '.';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/shared/store/category';
import { IProduct } from '@/@types/prisma';

interface Props {
  title: string;
  items: IProduct[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,  
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, { threshold: 0.4 });

  React.useEffect(() => {
    if(intersection?.isIntersecting){
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, title, intersection?.isIntersecting]);

  return (  
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>

      {items.map((product, i) => (
          <ProductCard
            ingredients={product.ingredients}
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items.sort((a, b) => a.price - b.price)[0]?.price}
          />
        ))
      }
      </div>
    </div>
  )
}