import { Title, Container, TopBar, Filters, ProductsGroupList } from '@/shared/components/shared';
import { Suspense } from 'react';
import { useFilters, GetSearchParams } from '@/shared/lib/use-filters';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await useFilters(searchParams);

  return (
    <>
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
    </>
  );
}
