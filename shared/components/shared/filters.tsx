'use client';

import React from 'react';
import { Input } from '../ui';
import { RangeSlider, Title, CheckboxFiltersGroup } from '.';
import { useIngredients } from '@/shared/hooks/use-ingredients';
import { useFilters } from '@/shared/hooks/use-filters';
import { useQueryFilters } from '@/shared/hooks/use-query-filters';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();

  const filters = useFilters();
  
  useQueryFilters(filters);

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  }

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  return (
    <div className={className}>
      <Title
        text="Фильтрация"
        size="sm"
        className="mb-5 font-bold pb-4 border-b border-b-neutral-100"
      />
      <CheckboxFiltersGroup
        name="Тип теста"
        className="mb-5"
        title="Тип теста"
        selected={filters.pizzaTypes}
        onClickCheckbox={filters.setPizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />
      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5"
        title="Размеры"
        selected={filters.sizes}
        onClickCheckbox={filters.setSizes}
        loading={false}
        items={[
          { text: '20 см', value: '1' },
          { text: '30 см', value: '2' },
          { text: '40 см', value: '3' },
        ]}
      />

      <div className='mt-5 border-y-neutral-100 w-[250px] py-6 pb-7'>
        <p className='font-bold mb-3'>Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices?.('priceFrom', Number(e.target.value))}
            type="number"
            placeholder="0"
            min={0}
            max={1000}
          />
          <Input
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices?.('priceTo', Number(e.target.value))}
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
          />
        </div>
        <RangeSlider 
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={updatePrices}
        />
      </div>
      <CheckboxFiltersGroup 
        title="Инградиенты"
        className='mt-5'
        limit={4}
        defaultItems={items.slice(0, 4)}
        items={items} 
        loading={loading} 
        onClickCheckbox={filters.setIngredients}   
        selected={filters.selectedIngredients}  
      />
    </div>
  )
}