import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-demo';
  isAuth = false;
  isAdmin = false;
  constructor(private authService : AuthService) { }
  ngOnInit(): void {
    this.authService.user?.subscribe(user => {
      this.isAuth = !!user;
      this.isAdmin =user.previllage == 'admin';
       
    })
  }
  logout() {
    this.authService.logout();
  }
}
