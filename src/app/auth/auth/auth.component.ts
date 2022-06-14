import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  toggleMode() {
    this.isLogin = !this.isLogin;
  }
  login(userInput: { email: string, password: string }) {
    this.authService.login(userInput.email, userInput.password).then(res => {
      this.router.navigate(['ws/dashboard']);
     
    }).catch(e => console.log(e.message));
  }
  signup(userInput: { email: string, password: string })
 {
    this.authService.signup(userInput.email, userInput.password).then(res => {
      this.router.navigate(['ws/dashboard']);
    }).catch(e => console.log(e.message));
   
  }
}
