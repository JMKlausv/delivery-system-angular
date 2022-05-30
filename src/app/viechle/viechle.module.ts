import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViechleListComponent } from './viechle-list/viechle-list.component';
import { AddViechleComponent } from './add-viechle/add-viechle.component';
//import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from '../shared/admin.guard';
import { ViechleDetailComponent } from './viechle-detail/viechle-detail.component';
import { ViechleResolve } from './viechle.resolve';



const routes: Routes = [
  {
    path: '',
   canActivate:[AdminGuard],
    children: [
      {
        path: '',
        component: ViechleListComponent
      },
      {
        path: ':id',
        component: ViechleDetailComponent,
        resolve: {
          viechle: ViechleResolve
        }
      },
      {
        path: 'new',
        component:AddViechleComponent
      }
    ]
  }
 
]
@NgModule({
  declarations: [
    ViechleListComponent,

    AddViechleComponent,

    ViechleDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
  ,
  providers: [
    AdminGuard,
    ViechleResolve
  ]
})
export class ViechleModule { }
