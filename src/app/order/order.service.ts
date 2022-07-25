import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../model/order.interface';
import { OrderDb } from '../model/orderDb';
import { SharedService } from '../shared/shared.service';
const API: string =
  'https://delivery-system-angular-default-rtdb.firebaseio.com/orders';
const API2: string = 'https://localhost:7247/api/Order';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private sharedService: SharedService) {}

  addOrder(order: Order) {
    var productItems: { productId: number | undefined; quantity: number }[] =
      [];
    order.products.forEach((p) => {
      productItems.push({
        productId: p.product.id,
        quantity: p.quantity,
      });
    });
    var orderData = {
      viechleId: order.viechleId,
      products: productItems,
      totalPrice: order.totalPrice,
      orderDate: order.orderDate,
      deliveryDate: order.deliveryDate,
      orderAddress: order.orderAddress,
    };
    return this.http.post(API2, orderData).toPromise();
    // return this.http.post(API + '.json', order).toPromise();

  }
  fetchOrders() {
    return this.sharedService.fetchAll(API2).pipe(map(res=>{
      res.forEach(o=>{
        console.log("singleorderrrrrrrr........",o );
      })
      return res as  OrderDb[];
  }));
    // return this.sharedService.fetchAll(API + '.json').pipe(
    //   map((res) => {
    //     return res as Order[];
    //   })
    // );
  }
  fetchSingleOrder(id: string) {
    return this.sharedService.fetchSingle(API2 + '/' + id ).pipe(map(res=>{
   
      return res as Order;
    }))
    // return this.sharedService
    //   .fetchSingle(API + '/' + id + '.json')
    //   .pipe(
    //     map((res) => {
    //       let order!: Object;
    //       if (id) {
    //         order = { ...res, id: id };
    //       }
    //       return order as Order;
    //     })
    //   )
    //   .toPromise();

  }
  editOrder(order: Order, id: number) {
    return this.sharedService.edit(order, API2 + '/' + id).toPromise();

    // return this.sharedService.edit(order, API + '/' + id + '.json').toPromise();

  }
  deleteOrder(id: number) {
    return this.sharedService.delete(API2 + '/' + id ).toPromise();

    // return this.sharedService.delete(API + '/' + id + '.json').toPromise();
  }
}
