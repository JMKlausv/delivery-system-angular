import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '../app/auth/auth.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { ViechleModule } from './viechle/viechle.module';
import { DashboardModule } from '../app/dashboard/dashboard.module';
// import { SidebarModule } from 'ng-cdbangular';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CookieService } from 'ngx-cookie-service';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { AdminGuard } from './shared/admin.guard';
import { WorkspaceComponent } from './workspace/workspace.component';
// import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
const routes: Routes = [
  {
    path: '',
  //loadChildren: ()=>import('../app/auth/auth.module').then(m=>m.AuthModule)
    redirectTo: 'auth', pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: ()=>import('../app/auth/auth.module').then(m=>m.AuthModule)
  },
 
  {
    path: 'ws',
    canLoad: [AuthGuard],
    component:WorkspaceComponent,
    loadChildren: ()=>import('../app/workspace/workspace.module').then(m=>m.WorkspaceModule)
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
    // SidebarModule,
    AuthModule,
    GridModule,
    OrderModule,
    ProductModule,
    ViechleModule,
    DashboardModule,
    HttpClientModule,
    // SidebarModule,
    RouterModule.forRoot(routes),
  
  ],
  providers: [
    AuthGuard,
    CookieService,
    PageService,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
