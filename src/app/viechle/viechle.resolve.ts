import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Viechle } from "../model/viechle.interface";
import { ViechleService } from "./viechle.service";

@Injectable()
export class ViechleResolve implements Resolve<Viechle|undefined>{
  constructor(private viechleService:ViechleService) {
    
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Viechle>|undefined {

   if(!route.queryParamMap.get('id')){
      return undefined ;
   }
    return this.viechleService.fetchSingleViechle(route.queryParamMap.get('id')as string);
  }

}