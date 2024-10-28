'use client';

import React, { useRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { Search } from 'lucide-react';
import { useClickAway, useDebounce } from 'react-use';
import Link from 'next/link';
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';
import Image from 'next/image';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const ref = useRef(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [focused, setFocused] = React.useState(false);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery)
        setProducts(response);
      } catch (e) {
        console.error(e);
      }
    }, 
    250, [searchQuery]
  )

  return (
    <>
      {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
      <div className={cn('flex rounded-2xl flex-1 justify-between relative h-11', focused && 'z-30', className)}>
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={ref}
          onFocus={() => setFocused(true)}
          className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
          type="text"
          placeholder="Найти продукт..."
        />
        {products.length > 0 && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-100 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12',
            )}>
            {products.map((product) => (
              <Link onClick={() => setSearchQuery('')} href={`/product/${product.id}`} key={product.id}>
                <div className="flex items-center px-3 py-2 hover:bg-primary/10 cursor-pointer">
                  <Image alt={product.name} src={product.imageUrl} width={35} height={35} />
                  <div className='px-3'>{product.name}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}