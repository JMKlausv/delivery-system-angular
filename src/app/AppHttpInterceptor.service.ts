import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class AppHttpInterceptor implements HttpInterceptor{

constructor() {
}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token:string = localStorage.getItem("access_token")??"";
        // console.log('we are intercepting a request...............',token)
       req= req.clone({ headers:req.headers.set("Authorization",'Bearer '+token)});
       console.log('we are intercepting a request...............',req.headers)

       return next.handle(req);
    }

  }