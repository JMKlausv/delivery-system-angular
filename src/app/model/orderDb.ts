import { Product } from "./product.interface";

export interface OrderDb{
  id: number;
  products:{productId:number,productName:string,quantity:number} [];
  viechleId: number;
  viechleLicenceNumber:string;
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