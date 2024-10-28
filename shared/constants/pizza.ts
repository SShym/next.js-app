export const mapProductSize = {
  1: 'Маленькая',
  2: 'Средняя',
  3: 'Большая',
} as const;

export const mapPizzaType = {
  1: 'традиционная',
  2: 'тонкая'
} as const;


export const productSizes = Object.entries(mapProductSize).map(([value, name]) => ({
  value,
  name
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
  value,
  name
}));

export type ProductSize = keyof typeof mapProductSize;
export type PizzaType = keyof typeof mapPizzaType;