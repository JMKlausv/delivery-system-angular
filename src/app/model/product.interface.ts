import { Category } from "./category.interface";

export interface Product{
  id?: number;
  name: string;
  price: number;
  categoryId?:number;
  quantity: number;
  category: Category;
  imageUrl?: string;
}