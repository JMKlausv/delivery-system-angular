import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../model/order.interface';
import { SharedService } from '../shared/shared.service';
const API: string = "https://delivery-system-angular-default-rtdb.firebaseio.com/orders";
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private sharedService:SharedService) { }
  
  addOrder(order: Order) {
    return this.http.post(API + '.json', order).toPromise();
  }
  fetchOrders() {
    return this.sharedService.fetchAll(API + '.json').pipe(map(res => {
      return res as Order[];
    }));
  }
  fetchSingleOrder(id: string) {
   
    return  this.sharedService.fetchSingle(API + "/" + id + '.json').pipe(map((res) => {
      return res as Order;
    })).toPromise();
  }
  editOrder(order: Order, id:string) {
    return this.sharedService.edit(order , API + "/" + id + '.json',).toPromise();
  }
  deleteOrder(id: string) {
    return this.sharedService.delete(API + "/" + id + '.json').toPromise();
  }

}