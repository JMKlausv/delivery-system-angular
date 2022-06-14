import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-demo';
  isAuth$ = new Subject<boolean>();
  isAuth = false;
  isAdmin = false;
  @ViewChild('sidebar')
  sidebar!: SidebarComponent;

  constructor(private authService: AuthService) { 
    this.isAuth = this.authService.checkPermission();
    this.isAdmin = this.authService.checkAdminPrivellage();
  }
  ngOnInit(): void {
    console.log('app module....', this.authService.checkAdminPrivellage())
    this.isAuth = this.authService.checkPermission();
    this.isAdmin = this.authService.checkAdminPrivellage();
    // this.isAuth$.next(this.authService.checkPermission());

    // // this.authService.checkAuth().subscribe(res => {
    // //   this.isAuth = res;
    // //   console.log('app module....',  this.isAuth)
    // // });

    // this.authService.checkAuth().toPromise().then(res => {
    //   this.isAuth = res;
    //   console.log('app module....',  this.isAuth)
    // })

  }
//   public onCreated(args: any) {
//     this.sidebar.element.style.visibility = '';
// }
  logout() {
    this.isAuth = false;
    this.authService.logout();
  }
}
