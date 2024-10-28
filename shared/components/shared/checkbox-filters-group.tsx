'use client'

import React from 'react';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';
import { Input } from '../ui';

type Item = FilterCheckboxProps;

interface Props {
  title: string,
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  selected?: Set<string>;
  defaultValue?: string[];
  className?: string;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
    title,
    items,
    defaultItems,
    limit,
    searchInputPlaceholder = 'Поиск...',
    className,
    loading,
    onClickCheckbox,
    selected,
    defaultValue
  }) => {
    const [showAll, setShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    }

    if (loading) {
      return (
        <div className={className}>
          <p className="font-bold mb-3">{title}</p>
  
          {...Array(limit)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="w-full mb-4 h-6 bg-gray-200 rounded-[8px] animate-pulse" />
            ))}
  
          <div className="w-28 h-4 bg-gray-200 rounded-[8px] animate-pulse" />
        </div>
      );
    }

    const list = showAll ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())) : (defaultItems || items)?.slice(0, limit);
    
  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && 
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      }
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            value={item.value}
            text={item.text}
            checked={selected?.has(item.value)}
            endAdornment={item.endAdornment}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
          />
        ))}
      </div>
      {limit && items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  )
}