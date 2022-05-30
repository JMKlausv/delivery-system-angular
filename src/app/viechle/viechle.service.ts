import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Viechle } from '../model/viechle.interface';
const API: string = "https://delivery-system-angular-default-rtdb.firebaseio.com/viechles";
@Injectable({
  providedIn: 'root'
})
export class ViechleService {

  constructor(private http: HttpClient) { }
  
  addViechles(viechles: Viechle[]) {
    const error: BehaviorSubject<string> = new BehaviorSubject<string>('');
    viechles.forEach(v => {
      this.http.post(API, v).toPromise().catch(e => error.next(e));
    })
    return error;
    
  }
  fetchViechles() {
    return this.http.get<{ [key: string]: Viechle }>(API + ".json").pipe(map((res) => {
      const veichles: Viechle[] = [];
      for (const key in res) {
        veichles.push({ ...res[key], id: key })
      }
      return veichles;
    }));
  }
  fetchSingleViechle(id: string) {
   
    return this.http.get(API + "/" + id + '.json').pipe(map((res) => {
      return res as Viechle;
    })).toPromise();
  }
}