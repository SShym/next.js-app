import React from "react";
import { ProductSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { ProductItem } from "@prisma/client";
import { Variant } from "../components/shared/group-variants";
import { getAvailableSizes, getAvailablePizzaTypes } from "../lib";

interface ReturnProps{
  size: ProductSize;
  type: PizzaType;
  currentItemId?: number;
  availableSizes: Variant[];
  availableTypes: Variant[];
  setSize: (size: ProductSize) => void;
  setType: (size: PizzaType) => void;
  selectedIngredients: Set<number>;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<ProductSize>(1);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet<number>(new Set([]));

  const isPizza = items.some(item => item.pizzaType);

  const availableSizes = getAvailableSizes(type, isPizza, items);
  const availableTypes = getAvailablePizzaTypes(items);

  let currentItemId;
  if(isPizza) {
    currentItemId = items.find(item => item.pizzaType === type && item.size === size)?.id;
  } else {
    currentItemId = items.find(item => item.size === size)?.id;
  }

  React.useEffect(() => {
    const isAvailableSize = availableSizes.find(pizza => Number(pizza.value) === size && !pizza.disabled);
    const availableSize = availableSizes?.find(pizza => !pizza.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as ProductSize);
    }
  }, [type])

  return {
    size,
    currentItemId,
    availableSizes,
    availableTypes,
    selectedIngredients,
    type,
    setSize,
    setType,
    addIngredient
  }
}