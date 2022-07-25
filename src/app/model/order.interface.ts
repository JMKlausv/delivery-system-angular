import { Product } from "./product.interface";
export interface Order{
  id?: number;
  // products: {productId:string, productName:string,quantity:number}[];
  products:{product:Product,quantity:number} [];
  viechleId: number;
  totalPrice: number;
  orderDate: Date;
  deliveryDate: Date;
  orderAddress: {
    region: string,
    city: string,
    specificAddress?: string,
    customerEmail?: string,
    phone?: string,
  };


}