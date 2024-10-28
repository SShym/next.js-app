import { Ingredient, ProductItem } from "@prisma/client";
import { ProductSize, PizzaType } from "../constants/pizza";

export const calcTotalPizzaPrice = (
  size: ProductSize, 
  items: ProductItem[], 
  type?: PizzaType, 
  ingredients?: Ingredient[],
  selectedIngredients?: Set<number>
) => {
  const pizzaPrice = items.find(item => item.pizzaType === type && item.size === size)?.price || 0;
  const productPrice = items.find(item => item.size === size)?.price || 0;

  const totalIngredientsPrice = 
    ingredients?.filter(ingredient => selectedIngredients?.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return (pizzaPrice || productPrice) + (totalIngredientsPrice || 0)
}

