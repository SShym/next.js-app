import { Product } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants";

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } });

  return data;
}

export const findProduct = async (id: number) => {
  const { data } = await axiosInstance.get('product/id', { params: { id } });

  return data;
}