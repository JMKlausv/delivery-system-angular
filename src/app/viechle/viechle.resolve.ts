import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Viechle } from "../model/viechle.interface";
import { ViechleService } from "./viechle.service";

@Injectable()
export class ViechleResolve implements Resolve<Viechle>{
  constructor(private viechleService:ViechleService) {
    
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Viechle> {

   
    return this.viechleService.fetchSingleViechle(route.params.id);
  }

}