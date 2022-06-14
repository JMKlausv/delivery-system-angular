export interface Order{
  id?: string;
  products: {productId:string, productName:string,quantity:number}[];
  viechleId: string;
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