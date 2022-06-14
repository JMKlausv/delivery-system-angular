import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Viechle } from '../model/viechle.interface';
import { SharedService } from '../shared/shared.service';
const API: string = "https://delivery-system-angular-default-rtdb.firebaseio.com/viechles";
@Injectable({
  providedIn: 'root'
})
export class ViechleService {

  constructor(private http: HttpClient, private sharedService:SharedService) { }
  
  addViechles(viechles: Viechle[]) {
    const error: BehaviorSubject<string> = new BehaviorSubject<string>('');
    for (let i = 0; i < viechles.length; i++){
      this.http.post(API+'.json', viechles[i]).toPromise().catch(e => error.next(e));
    }
    return error;
    
  }
  fetchViechles() {
    return this.sharedService.fetchAll(API + '.json').pipe(map(res => {
      return res as Viechle[];
    }));
  }
  fetchSingleViechle(id: string) {
   
    return  this.sharedService.fetchSingle(API + "/" + id + '.json').pipe(map((res) => {
      return res as Viechle;
    })).toPromise();
  }
  editViechle(viechle: Viechle, id:string) {
    return this.sharedService.edit(viechle , API + "/" + id + '.json',).toPromise();
  }
  deleteViechle(id: string) {
    return this.sharedService.delete(API + "/" + id + '.json').toPromise();
  }
}