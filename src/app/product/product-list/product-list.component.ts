import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/model/product.interface';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  columnData: { field: string, headerText: string }[] = [
    { field: 'name', headerText: 'product-name' },
    { field: 'price', headerText: 'Price' },
    { field: 'quantity', headerText: 'Quantity' },
    { field: 'category.name', headerText: 'category' },
  ];
  constructor(private productService:ProductService , private router:Router) { }

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe(res => {
      this.products = res;
    })
  }
  viewProduct(rowData: any) {
  
   this.router.navigate(['ws/product',rowData.id])
  }
  deleteProduct(rowData: any) {
    if (window.confirm('are you sure')) {
      this.productService.deleteProduct(rowData.id).then(res => {
        this.ngOnInit();
      })
    }
  }
}
