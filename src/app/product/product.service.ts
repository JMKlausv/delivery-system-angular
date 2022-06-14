import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../model/category.interface';
import { Product } from '../model/product.interface';
import { SharedService } from '../shared/shared.service';
const API: string = "https://delivery-system-angular-default-rtdb.firebaseio.com/";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private sharedService: SharedService , private http:HttpClient) { }
  addProducts(products: Product[]) {
    const error: BehaviorSubject<string> = new BehaviorSubject<string>('');
    for (let i = 0; i < products.length; i++){
      this.http.post(API+'products.json', products[i]).toPromise().catch(e => error.next(e));
    }
    return error;
    
  }
  fetchProducts() {
    return this.sharedService.fetchAll(API + 'products.json').pipe(map(res => {
      return res as Product[];
    }));
  }
  fetchSingleProduct(id: string) {
   
    return  this.sharedService.fetchSingle(API + "products/" + id + '.json').pipe(map((res) => {
      return res as Product;
    })).toPromise();
  }
  editProduct(product: Product, id:string) {
    return this.sharedService.edit(product , API + "products/" + id + '.json',).toPromise();
  }
  deleteProduct(id: string) {
    return this.sharedService.delete(API + "products/" + id + '.json').toPromise();
  }
  fetchCategories() {
    return this.sharedService.fetchAll(API + 'categories.json').pipe(map(res => {
      return res as Category[] ;
    }));
   
  }
  fetchCategoryProducts(categoryId:string){
    return this.sharedService.fetchAll(API + 'categories.json'+'?orderBy="category"&equalTo="' + categoryId + '"' ).pipe(map(res => {
      return res as Product[];
    }));
  }
  addCategories(categories: Category[]) {
    const error: BehaviorSubject<string> = new BehaviorSubject<string>('');
    for (let i = 0; i < categories.length; i++){
      this.http.post(API+'categories.json', categories[i]).toPromise().catch(e => error.next(e));
    }
    return error;
    
  }
  deleteCategory(id: string) {
    return this.sharedService.delete(API + "categories/" + id + '.json').toPromise();
  }
  fetchSingleCategory(id: string) {
   
    return  this.sharedService.fetchSingle(API + "categories/" + id + '.json').pipe(map((res) => {
      return res as Category;
    })).toPromise();
  }
}
