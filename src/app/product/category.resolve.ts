import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Category } from "../model/category.interface";

import { Product } from "../model/product.interface";
import { ProductService} from "./product.service";
@Injectable()
  
export class CategoryResolve implements Resolve<Category |undefined>{
  constructor(private productService: ProductService) {
   
 }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Category | Observable<Category> | Promise<Category >|undefined {
    if(!route.queryParamMap.get('id')){
      return undefined;
    }
    return this.productService.fetchSingleCategory(route.queryParamMap.get('id')as string);
  }
  
}