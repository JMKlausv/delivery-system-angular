import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  @Output()
  toggle: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  onToggle(event: any) {
      this.toggle.emit(event);
  }
  onSubmit() {
    this.submit.emit(this.form.value);
  }
}

