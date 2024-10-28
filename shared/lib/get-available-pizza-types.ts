import { ProductItem } from "@prisma/client";
import { PizzaType, pizzaTypes } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";

export const getAvailablePizzaTypes = (items: ProductItem[]): Variant[] => {
  return pizzaTypes.map(({ name, value }) => {
    const isAvailable = items.some(item => String(item.pizzaType) === value);
    return {
      name,
      value,
      disabled: !isAvailable,
    };
  });
}