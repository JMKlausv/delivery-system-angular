import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViechleListComponent } from './viechle-list/viechle-list.component';
import { AddViechleComponent } from './add-viechle/add-viechle.component';
//import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from '../shared/admin.guard';
import { ViechleResolve } from './viechle.resolve';
import { SharedModule } from '../shared/shared.module';
import { PageService, SortService, FilterService, GroupService , CommandColumnService  } from '@syncfusion/ej2-angular-grids';



const routes: Routes = [
  {
    path: '',
   canActivate:[AdminGuard],
    children: [
      {
        path: '', pathMatch:'full',
        component: ViechleListComponent
      },
      {
        path: 'new',
        pathMatch:'full',
        component:AddViechleComponent,
        resolve: {
          viechle: ViechleResolve
        }
      },
   
    ]
  }
 
]
@NgModule({
  declarations: [
    ViechleListComponent,
    AddViechleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
  ,
  providers: [
    AdminGuard,
    ViechleResolve,
    PageService,
    SortService,
    FilterService,
    GroupService,
    CommandColumnService 
  ]
})
export class ViechleModule { }
