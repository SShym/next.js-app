import { Category, Ingredient, Product, ProductItem } from "@prisma/client";

export type IProduct = Product & { 
  items: ProductItem[]; 
  ingredients: Ingredient[] 
};

export type ICategory = Category & {
  products: IProduct[];
}