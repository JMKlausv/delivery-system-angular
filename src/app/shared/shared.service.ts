import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product.interface';
import { User } from '../model/user.interface';
import { Viechle } from '../model/viechle.interface';
//const API: string = "https://delivery-system-angular-default-rtdb.firebaseio.com/viechles";
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  fetchAll(API: string) {


    return this.http.get(API).pipe(map(res=>{
      return res as Object[];
    }));
    // return this.http.get<{ [key: string]: object}>(API).pipe(map((res) => {
    //   const resData: object[] = [];
    //   for (const key in res) {
    //     resData.push({
    //       ...res[key], id: key,
    //     })
    //   }
    //   return resData;
    // }));
  }

  fetchSingle( API:string) {
   
    return this.http.get(API);
  }
  edit(data: object, API:string) {
    console.log("api: ---- ",API);
    console.log("data:--- ", data);
    return this.http.put(API , data);
  }
  delete(API: string) {
    return this.http.delete(API);
  }
  patch(data: object, API:string) {
    return this.http.patch(API , data);
  }
}