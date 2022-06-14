import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolve } from './product.resolve';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AdminGuard } from '../shared/admin.guard';


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
        component:AddProductComponent
      },
      {
        path: 'categories',
        pathMatch: 'full',
       component:CategoryListComponent 
      },
      {
        path: 'categories/new',
        pathMatch: 'full',
        component:AddCategoryComponent
      },
      {
        path: ':id',
         pathMatch:'full',
        component: ProductDetailComponent,
        resolve:{
          product:ProductResolve
        }
      },

    ]
  },

 
]

@NgModule({
  declarations: [
    ProductListComponent,
    AddProductComponent,
    ProductDetailComponent,
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
    AdminGuard
  ]
})
export class ProductModule { }
