import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from 'src/app/model/category.interface';
import { Order } from 'src/app/model/order.interface';
import { SharedService } from 'src/app/shared/shared.service';
// const API: string = "https://delivery-system-angular-default-rtdb.firebaseio.com/";
const API2:string = "https://localhost:7247/api/";
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  public piedata$: Subject<Object[]> = new Subject<Object[]>();
  public piedata: Object[] = [];
  categories: Category[] =[];
  orders!: Order[];
  chartData!: {category:Category,count:number}
  public map: Object = 'fill';
  public datalabel!: Object;
  public title:string = 'Order statistics'
  public legendSettings!: Object;
  constructor(private sharedService:SharedService){}
  ngOnInit(): void {
    // this.sharedService.fetchAll(API + 'categories.json').subscribe(res => {
    this.sharedService.fetchAll(API2 + 'Category').subscribe(res => {
      this.categories = res as Category[];
      // console.log('atttt', this.categories)
      this.categories.forEach(cat => {
        this. piedata.push({
          category: cat.name,
          count:cat.orderCount?cat.orderCount:0
        })
      })
      this.piedata$.next(this.piedata)
    });
 
    
    // console.log("pie data isssssssssss",this.piedata)
    this.datalabel = { visible: true, name: 'category', position: 'Outside' };
    this.legendSettings = {
      visible: false
    };

  }

}