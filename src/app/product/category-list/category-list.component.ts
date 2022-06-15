import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommandModel, EditSettingsModel, GridComponent, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Category } from 'src/app/model/category.interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  public editSettings!: EditSettingsModel;
  public pageSettings!: PageSettingsModel;
  public commands!: CommandModel[];
  columnData: { field: string, headerText: string }[] = [
    
    { field: 'name', headerText: 'Category name' },
  ];
  @ViewChild('grid') public grid!: GridComponent;
  constructor(private productService:ProductService , private router:Router) { }

  ngOnInit(): void {
    this.productService.fetchCategories().subscribe(res => {
      this.categories = res;
    })
  }
  editCategory(rowData:any){

  }
  deleteCategory(rowData: any) {
    if (window.confirm('are you sure')) {
      this.productService.deleteCategory(rowData.id).then(res => {
        this.ngOnInit();
      })
    }
  }


}

