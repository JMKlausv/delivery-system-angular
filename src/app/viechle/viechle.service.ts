import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Viechle } from '../model/viechle.interface';
import { SharedService } from '../shared/shared.service';
const API: string = "https://delivery-system-angular-default-rtdb.firebaseio.com/viechles";
const API2 : string = "https://localhost:7247/api/Viechle";
@Injectable({
  providedIn: 'root'
})
export class ViechleService {

  constructor(private http: HttpClient, private sharedService:SharedService) { }
  
  addViechles(viechles: Viechle[]) {
    const error: BehaviorSubject<string> = new BehaviorSubject<string>('');
    for (let i = 0; i < viechles.length; i++){
      //this.http.post(API+'.json', viechles[i]).toPromise().catch(e => error.next(e));
       this.http.post(API2,viechles[i]).toPromise().catch(e=>error.next(e));
    }
    return error;
    
  }
  fetchViechles() {
     // return this.sharedService.fetchAll(API + '.json').pipe(map(res => {
      return this.http.get(API2).pipe(map(res=>{
      
      return res as Viechle[];

    }));
  }
  fetchSingleViechle(id: string) {
   
   return this.sharedService.fetchSingle(API2+"/"+id).pipe(map((res)=>{
     return res as Viechle;
   })).toPromise();



    // return  this.sharedService.fetchSingle(API + "/" + id + '.json').pipe(map((res) => {
    //   let viechle!:Object;
    //   if(id){
    //     viechle = {...res,id:id}
    //   }
    //   return viechle as Viechle;
    // })).toPromise();
  }
  editViechle(viechle: Viechle, id:string) {
  //  return this.sharedService.edit(viechle , API + "/" + id + '.json',).toPromise();
    return this.sharedService.edit(viechle,API2+"/"+id).toPromise();
  }
  deleteViechle(id: string) {
    //return this.sharedService.delete(API + "/" + id + '.json').toPromise();
     return this.sharedService.delete(API2 + "/" + id ).toPromise();
  }
}