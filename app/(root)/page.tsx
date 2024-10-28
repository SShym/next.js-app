import { MainPage } from '@/shared/components/shared/main-page';
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams);

  return (
    <MainPage categories={categories} />
  );
}
