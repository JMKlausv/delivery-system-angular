import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shared-button-add',
  templateUrl: './shared-button-add.component.html',
  styleUrls: ['./shared-button-add.component.css']
})
export class SharedButtonAddComponent implements OnInit {
  @Output()
  add:EventEmitter<any>= new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }
  onAdd(event:any) {
    this.add.emit(event);
}
}
