import { Ingredient } from '@prisma/client';
import { ProductSize, PizzaType, mapPizzaType } from '../constants/pizza';
import { CartStateItem } from './get-cart-details';

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  pizzaType?: PizzaType,
  productSize?: ProductSize,
): string => {
  const details = [];

  if (productSize && pizzaType) {
    details.push(`${mapPizzaType[pizzaType]} ${productSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
};