import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.interface';
import { Observable, Subject } from 'rxjs';
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
  isAuth = new Subject<boolean>();
  isAdmin = new Subject<boolean>();
  user = new Subject<User>();
  expDate!: Date;
  idToken!: string;
  constructor(private http: HttpClient, private router: Router, private cookies: CookieService) {
  }
  private setCookies(user:User,idToken:string) {
    this.cookies.set('userId', user.localId,user.expDate);
    this.cookies.set('email', user.email,user.expDate);
    this.cookies.set('previllage', user.previllage,user.expDate);
    this.cookies.set('idToken', idToken, user.expDate);
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
      this.idToken = res.idToken;
      return this.http.get<User>(API + '/users/'+res.localId+'.json').toPromise();
     
    
    }).then(userRes => {
      
      const user: User = { localId: userRes.localId, email: userRes.email, previllage: userRes.previllage, expDate: this.expDate, idToken: this.idToken };
      this.user?.next(user);
      this.setCookies(user, this.idToken);
      this.isAuth.next( this.cookies.check('user'));
      this.isAdmin.next(this.cookies.get('previllage') == 'admin');
    console.log('loginnnnnnnn',this.cookies.get('previllage'))
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
         this.setCookies(user, this.idToken)
         this.isAuth.next( this.cookies.check('user'));
         this.isAdmin.next(this.cookies.get('previllage') == 'admin');
        });
      })
  }

  logout() {
    this.user?.next(undefined);
    this.isAuth.next(false);
    this.cookies.deleteAll();
    console.log('logout cookies are.....', this.cookies.getAll())
    console.log(this.cookies.check('idToken'));
    this.router.navigate(['/']);
  }
  checkPermission() {
    return this.cookies.check('idToken');
  }
  checkAdminPrivellage() {
    return this.cookies.get('previllage') == 'admin';
  }
  checkAuth(): Observable<boolean>{
    let isAuth: boolean = this.cookies.check('idToken');
    const auth$ = new Subject<boolean>();
    auth$.next(isAuth)
    return auth$;
  }
}
