import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '../app/auth/auth.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { ViechleModule } from './viechle/viechle.module';
import { DashboardModule } from '../app/dashboard/dashboard.module';
import { SidebarModule } from 'ng-cdbangular';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CookieService } from 'ngx-cookie-service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()=>import('../app/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'dashboard',
    canLoad:[AuthGuard],
    loadChildren: ()=>import('../app/dashboard/dashboard.module').then(m=>m.DashboardModule)
  },
  {
    path: 'order',
    canLoad:[AuthGuard],
    loadChildren: ()=>import('../app/order/order.module').then(m=>m.OrderModule)
  },
  {
    path: 'product',
    canLoad:[AuthGuard],
    loadChildren: ()=>import('../app/product/product.module').then(m=>m.ProductModule)
  },
  {
    path: 'viechle',
    canLoad:[AuthGuard],
    loadChildren: ()=>import('../app/viechle/viechle.module').then(m=>m.ViechleModule)
  },
  {
    path: '',   redirectTo: 'auth', pathMatch: 'full'
  },
  {
    path: '**', 
    component: PageNotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    OrderModule,
    ProductModule,
    ViechleModule,
    DashboardModule,
    HttpClientModule,
    SidebarModule,
    RouterModule.forRoot(routes),
  
  ],
  providers: [
  AuthGuard,
  CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
