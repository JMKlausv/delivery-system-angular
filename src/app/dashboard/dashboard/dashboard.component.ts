import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
const API2:string = "https://localhost:7247/api/";
const API: string = "https://delivery-system-angular-default-rtdb.firebaseio.com/";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation:ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
  productCount!: number;
  veichleCount!: number;
  orderCount!: number;
  constructor(private sharedService: SharedService) { 
   }

  ngOnInit(): void {
    // this.sharedService.fetchAll(API+'products.json').subscribe(res => this.productCount = res.length);
    // this.sharedService.fetchAll(API+'orders.json').subscribe(res => this.orderCount = res.length);
    // this.sharedService.fetchAll(API+'viechles.json').subscribe(res => this.veichleCount = res.length);  
    
    this.sharedService.fetchAll(API2+'Product').subscribe(res => this.productCount = res.length);
    this.sharedService.fetchAll(API2+'Order').subscribe(res => this.orderCount = res.length);
    this.sharedService.fetchAll(API2+'Viechle').subscribe(res => this.veichleCount = res.length);
  
  }
  // public cellSpacing: number[] = [10, 10];
  //     public cellAspectRatio: number = 50/50;
  // public panels: any = [
  // { "sizeX": 1, "sizeY": 1, "row": 0, "col": 0, content: '<div class="content">0</div>' },
  // { "sizeX": 1, "sizeY": 1, "row": 0, "col": 4, content: '<div class="content">2</div>' },
  // { "sizeX": 1, "sizeY": 1, "row": 1, "col": 0, content: '<div class="content">3</div>' },
  // // { "sizeX": 3, "sizeY": 2, "row": 0, "col": 1, content: '<div class="content"><app-chart></app-chart></div>' },
  // // { "sizeX": 2, "sizeY": 1, "row": 2, "col": 0, content: '<div class="content">4</div>' },
  // // { "sizeX": 1, "sizeY": 1, "row": 2, "col": 2, content: '<div class="content">5</div>' },
  // // { "sizeX": 1, "sizeY": 1, "row": 2, "col": 3, content: '<div class="content">6</div>' }
  // ]



}
