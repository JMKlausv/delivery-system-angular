import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { OrderDetialComponent } from './order-detial/order-detial.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { AggregateService } from '@syncfusion/ej2-angular-grids';
import { JoinPipe } from '../shared/join.pipe';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component:OrderListComponent
      },
      {
        path: 'new',
        component:AddOrderComponent
      },
      {
        path: ':id',
        component: OrderDetialComponent,
        pathMatch:'full'
      },
    
    ]
  }
]
@NgModule({
  declarations: [
    OrderListComponent,
    AddOrderComponent,
    OrderDetialComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DropDownListModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AggregateService,
    JoinPipe
   
  ]
})
export class OrderModule { }
