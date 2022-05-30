import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
    this.submit.emit(this.form.value)
  }

}
