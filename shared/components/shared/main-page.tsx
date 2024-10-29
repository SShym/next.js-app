import React from 'react';
import { Suspense } from 'react';
import { Title, Container, TopBar, Filters, ProductsGroupList } from '@/shared/components/shared';
import { ICategory } from '@/@types/prisma';

interface Props {
  categories: ICategory[];
  className?: string;
}

export const MainPage: React.FC<Props> = ({ categories, className }) => {  
  return (
    <div className={className}>
      <Container className='mt-10'>
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />
      <Container className='mt-10 pb-14'>
        <div className='flex gap-[80px]'>
          <div className='flex w-[250px]'>
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              {categories.map((category) => (
                category.products.length > 0 && (
                  <ProductsGroupList
                    title={category.name}
                    categoryId={category.id}
                    key={category.id}
                    items={category.products}
                  />
                )
              ))}
            </div>
          </div>
        </div>
      </Container> 
    </div>
  )
}