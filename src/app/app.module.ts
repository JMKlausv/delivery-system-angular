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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CookieService } from 'ngx-cookie-service';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { AdminGuard } from './shared/admin.guard';
import { WorkspaceComponent } from './workspace/workspace.component';
// import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { JwtModule } from "@auth0/angular-jwt";
import { AppHttpInterceptor } from './AppHttpInterceptor.service';
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
    AuthModule,
    GridModule,
    OrderModule,
    ProductModule,
    ViechleModule,
    DashboardModule,
    HttpClientModule,
    // SidebarModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: ()=>{
          return localStorage.getItem("access_token");
        },
        allowedDomains: ["https://localhost:7247/"],
       // disallowedRoutes: ["http://example.com/examplebadroute/"],
       skipWhenExpired: true,
      },
    }),
  
  ],
  providers: [
    AuthGuard,
    CookieService,
    PageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
