import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { SharedButtonGroupComponent } from './shared-button-group/shared-button-group.component';
import { SharedButtonAddComponent } from './shared-button-add/shared-button-add.component';
import { EjsGridComponent } from './ejs-grid/ejs-grid.component';



@NgModule({
  declarations: [
    SharedButtonGroupComponent,
    SharedButtonAddComponent,
    EjsGridComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GridModule
    
  ],
  providers:[
    PageService,
    SortService,
    FilterService,
    GroupService
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GridModule,
    SharedButtonGroupComponent,
    SharedButtonAddComponent,
    EjsGridComponent
  ]
})
export class SharedModule { }
