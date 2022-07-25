import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Order } from "../model/order.interface";

import { Product } from "../model/product.interface";
import { OrderService } from "./order.service";

@Injectable()
  
export class OrderResolve implements Resolve<Order |undefined>{
  constructor(private orderService: OrderService) {
   
 }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Order | Observable<Order> | Promise<Order> |undefined{
    if(!route.queryParamMap.get('id')){
      return undefined;
    }
    return this.orderService.fetchSingleOrder(route.queryParamMap.get('id')as string);
  }
  
}