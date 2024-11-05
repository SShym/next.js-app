import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import React from 'react';

interface Props {
  className?: string;
  imageUrl: string;
  isPizza: boolean;
  size: 1 | 2 | 3;
}

export const ProductImage: React.FC<Props> = ({ className, imageUrl, isPizza, size }) => {

  return (
    <div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
      <Image
        quality={100}
        width={50}
        height={50}
        src={imageUrl}
        alt="pizza"
        className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
          'w-[300px] h-[300px]': size === 1,
          'w-[400px] h-[400px]': size === 2,
          'w-[500px] h-[480px]': size === 3,
        })}
      />
      {isPizza &&
        <>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-200 w-[370px] h-[370px]" />
        </>
      }
    </div>
  )
}