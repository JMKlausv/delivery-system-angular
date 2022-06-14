import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shared-button-group',
  templateUrl: './shared-button-group.component.html',
  styleUrls: ['./shared-button-group.component.css']
})
export class SharedButtonGroupComponent implements OnInit {
  @Output()
    cancel: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  onCancel(event:any) {
    this.cancel.emit(event);
  }

}
