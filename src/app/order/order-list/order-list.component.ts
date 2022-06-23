import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Order } from 'src/app/model/order.interface';
import { JoinPipe } from 'src/app/shared/join.pipe';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  orderData: Object[] = [];
  orderData$: Subject<Object[]> = new Subject<Object[]>();
  columnData: { field: string, headerText: string }[] = [
    { field: 'products', headerText: 'Products' },
    { field: 'viechleId', headerText: 'Viechle id' },
    { field: 'totalPrice', headerText: 'Total Price' },
    { field: 'orderDate', headerText: 'Order Date' },
    { field: 'deliveryDate', headerText: 'Delivery Date' }
  ];
  constructor(private orderService:OrderService , private router:Router , private join : JoinPipe) { }
   ngOnInit() {
    this.orderService.fetchOrders().subscribe(res => {
      this.orders = res;
      this.orders.forEach(o => {
        let productNames: string[] = [];
        o.products.forEach(p => {
          productNames.push(p.product.name);
        })
           this.orderData.push(
          {
            id: o.id,
            viechleId: o.viechleId,
            orderDate: o.orderDate,
            deliveryDate: o.deliveryDate,
            totalPrice: o.totalPrice,
            products: productNames.join(','),
          }
        );
      });
      this.orderData$.next(this.orderData);
    });
  }
  viewOrder(rowData: any) {
  
   this.router.navigate(['/ws/order/new'],{queryParams:{id:rowData.id}})
  }
  deleteOrder(rowData: any) {
    if (window.confirm('are you sure')) {
      
      this.orderService.deleteOrder(rowData.id).then(res => {
        console.log('refreshing........')
        this.ngOnInit();
        
      })
    }
  }
}