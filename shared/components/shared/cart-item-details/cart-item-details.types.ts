import { ingredients } from "@/prisma/constants";
import { Ingredient } from "@prisma/client";

export interface CartItemProps {
  details: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;
}
