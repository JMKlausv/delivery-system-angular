import { Category } from "./category.interface";

export interface Product{
  id?: string;
  name: string;
  price: number;
  quantity: number;
  category: Category;
  imageUrl?: string;
}