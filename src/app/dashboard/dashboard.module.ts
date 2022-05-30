import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
//import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
// import {SidebarModule } from 'cdbangular';
import { SidebarModule } from 'ng-cdbangular';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
]

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
   SidebarModule,
    // CDBFreeModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
