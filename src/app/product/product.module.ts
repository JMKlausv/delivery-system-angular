import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product/product-list/product-list.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolve } from './product.resolve';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AdminGuard } from '../shared/admin.guard';
import { CategoryResolve } from './category.resolve';


const routes: Routes = [
  {
    path: '',
    canActivate:[AdminGuard],
    children: [  
      {
        path: '', pathMatch:'full',
        component: ProductListComponent
      },
      {
        path: 'new',
        pathMatch:'full',
        component:AddProductComponent,
        resolve:{
          product:ProductResolve
        }
      },
      {
        path: 'categories',
        pathMatch: 'full',
       component:CategoryListComponent 
      },
      {
        path: 'categories/new',
        pathMatch: 'full',
        component:AddCategoryComponent,
        // resolve:{
        //   category:CategoryResolve
        // }
      },
      // {
      //   path: ':id',
      //    pathMatch:'full',
      //   component: ProductDetailComponent,
      //   resolve:{
      //     product:ProductResolve
      //   }
      // },

    ]
  },

 
]

@NgModule({
  declarations: [
    ProductListComponent,
    AddProductComponent,
    AddCategoryComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DropDownListModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ProductResolve,
    CategoryResolve,
    AdminGuard
  ]
})
export class ProductModule { }
