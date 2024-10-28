import { ProductItem } from "@prisma/client";
import { PizzaType, productSizes } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";

export const getAvailableSizes = (type: PizzaType, isPizza: boolean, items: ProductItem[]): Variant[] => {
  if(isPizza){
    const filteredPizzasByType = items.filter(item => item.pizzaType === type);

    return productSizes.map(item => {
      return {
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.find(pizza => Number(pizza.size) === Number(item.value))
      }
    });
  } else {
    return productSizes.map(item => {
      return {
        name: item.name,
        value: item.value,
      }
    });
  }
}