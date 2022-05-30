import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.interface';
import { Subject } from 'rxjs';
import { tap , switchMap } from 'rxjs/operators';
import { collectExternalReferences } from '@angular/compiler';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
 interface AuthResponseData{
  kind:string,
   localId: string,
   displayName?:string,
  expiresIn: string,
  refreshToken: string,
  email: string,
  idToken: string,
  registered?:boolean
 
}

const API: string = "https://delivery-system-angular-default-rtdb.firebaseio.com/";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;
  isAdmin = false;
  user = new Subject<User>();
  expDate!: Date;
  idToken!: string;
  constructor(private http: HttpClient, private router: Router, private cookies: CookieService) {
    this.isAuth = this.cookies.check('user');
    this.isAdmin = this.cookies.get('previllage') == 'admin';
    this.user?.subscribe(user => {
      this.isAdmin = user?.previllage == 'admin';
    })

  }
  private setCookies(user:User,idToken:string) {
    this.cookies.set('userId', user.localId,this.expDate);
    this.cookies.set('email', user.email,this.expDate);
    this.cookies.set('previllage', user.previllage,this.expDate);
    this.cookies.set('idToken', idToken, this.expDate)
    
  }
  login(email: string, password: string) {
    
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlkx3-RCd6opyokWo8-DskBNfYE2gef-k',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).toPromise().then((res) => {
      this.expDate = new Date(new Date().getTime() + +res.expiresIn * 1000);

      return this.http.get<User>(API + '/users/'+res.localId+'.json').toPromise();
     
    
    }).then(userRes => {
      
      const user: User = { localId: userRes.localId, email: userRes.email, previllage: userRes.previllage, expDate: this.expDate, idToken: this.idToken };
      this.user?.next(user);
      this.setCookies(user, this.idToken);
    
    })

  }
  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlkx3-RCd6opyokWo8-DskBNfYE2gef-k',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).toPromise().then(res => {
        let expDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
        const user: User = { localId: res.localId, email: res.email, previllage: 'system-user', expDate: expDate, idToken: res.idToken };
       return this.http.put(API + '/users/'+res.localId+'.json', {localId:user.localId,email:user.email,previllage:user.previllage}).toPromise().then((res) => {
          this.user?.next(user);
         this.setCookies(user,this.idToken)
        });
      })
  }

  logout() {
    this.user?.next(undefined);
    this.isAuth = false;
    this.router.navigate(['/auth']);
    this.cookies.deleteAll();
  }
  checkPermission() {
    return this.isAuth;
  }
  checkAdminPrivellage() {
    return this.isAdmin;
  }
}
