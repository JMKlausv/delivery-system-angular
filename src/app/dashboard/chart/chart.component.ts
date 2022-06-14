import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order.interface';
import { SharedService } from 'src/app/shared/shared.service';
const API: string = "https://delivery-system-angular-default-rtdb.firebaseio.com/orders.json";
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public primaryXAxis!: Object;
  public chartData: Object[]=[];
  public primaryYAxis!: Object;
  public title!: string;
  monthOrderCounts: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  months : string[]=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  constructor(private sharedService: SharedService) { 
  }
  ngOnInit(): void {
      // Title for chart
    this.sharedService.fetchAll(API).subscribe(res => {
      const orders = res as Order[];
      orders.forEach(o => {
        let date = new Date(o.orderDate).getMonth();
        this.monthOrderCounts[date - 1] += o.totalPrice;
        })
    });
    console.log(this.monthOrderCounts)
    this.title = 'Orders Analysis';

    for (let i = 0; i < 12; i++){
      this.chartData.push({
        month: this.months[i],
        orders:this.monthOrderCounts[i]
      })
    }
    
      this.primaryXAxis = {
          valueType: 'Category'
      };
      this.primaryYAxis = {
          labelFormat: '${value}K'
      };
  }
  
}
