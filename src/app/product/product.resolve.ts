import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Product } from "../model/product.interface";
import { ProductService} from "./product.service";
@Injectable()
  
export class ProductResolve implements Resolve<Product>{
  constructor(private productService: ProductService) {
   
 }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product> {
    return this.productService.fetchSingleProduct(route.params.id);
  }
  
}