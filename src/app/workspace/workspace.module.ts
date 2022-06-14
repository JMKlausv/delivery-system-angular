import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SidebarModule, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
const routes: Routes = [
  {
    path: 'dashboard',
    canLoad:[AuthGuard],
    loadChildren: ()=>import('../dashboard/dashboard.module').then(m=>m.DashboardModule)
  },
  {
    path: 'order',
    canLoad:[AuthGuard],
    loadChildren: ()=>import('../order/order.module').then(m=>m.OrderModule)
  },
  {
    path: 'product',
    canLoad:[AuthGuard],
    loadChildren: ()=>import('../product/product.module').then(m=>m.ProductModule)
  },
  {
    path: 'viechle',
    canLoad:[AuthGuard],
    loadChildren: ()=>import('../viechle/viechle.module').then(m=>m.ViechleModule)
  },

]

@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    SidebarModule,
    TreeViewModule ,
    RouterModule.forChild(routes)
  ],
 // bootstrap: [WorkspaceComponent]
})
export class WorkspaceModule { }
