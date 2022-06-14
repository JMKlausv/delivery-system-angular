import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommandModel, GridComponent, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Category } from 'src/app/model/category.interface';
import { Product } from 'src/app/model/product.interface';
import { CategoryListComponent } from '../category-list/category-list.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public data: Product[] = [];
  public pageSettings!: PageSettingsModel;
  public commands!: CommandModel[];
  public cFields: Object = { text: 'name', value: 'id' };
  selectedCategory!: Category;
  @ViewChild('grid') public grid!: GridComponent;
  form = new FormGroup({
    name: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    products: new FormArray([
     
    ])
  })
  get productArray():FormArray {
    return (this.form.get('products') as FormArray )  ;
  }
  get name():FormControl {
    return (this.form.get('name') as FormControl) ;
  }
  get category():FormControl {
    return (this.form.get('category') as FormControl) ;
  }
  get price():FormControl {
    return (this.form.get('price') as FormControl) ;
  }
  get quantity():FormControl {
    return (this.form.get('quantity') as FormControl) ;
  }

  public categoryList: Category[] = [];
  constructor(private router:Router,private productService:ProductService ) { }

  ngOnInit(): void {
    this.pageSettings = { pageSize: 6 };
    this.commands = [
    { buttonOption: { content: 'x', cssClass: '' } }
    ];
    this.productService.fetchCategories().subscribe(res => {
      this.categoryList = res;
    })
  }
  removeProduct(index:number) {
    this.productArray.removeAt(index);
  }
  addProduct() {
    const name = this.name.value;
    const category = this.selectedCategory;
    const price = this.price.value;
    const quantity = this.quantity.value;
    if (name && category && price && quantity) {
      
      const newProductGroup = new FormGroup({
        name: new FormControl({ value: name, disabled: true },),
        category: new FormControl({ value: category, disabled: true }),
        price: new FormControl({ value: price, disabled: true }),
        quantity: new FormControl({ value: quantity, disabled: true }),
      });
      this.productArray.clear();
      
      this.productArray.push(newProductGroup);
      this.data.push(newProductGroup.value)


    }

  }
  addProductToDb() {
    const products = this.data;
    console.log('adding product ......',products)
    this.productService.addProducts(products).subscribe(errorRes => {
      if (errorRes == '') {
        this.router.navigate(['/ws/product']);
      }
      else {
        console.log('error is:',errorRes);
      }
    
      
    });
  }
  cancel() {
    this.router.navigate(['ws/product']);
  }

  
  commandClick(args: any) {
    const argsData = args.rowData;
    const oldData = this.data;
    this.data = [];
    oldData.forEach(d => {
      if (d.category == argsData.category && d.name == argsData.name && d.price == argsData.price && d.quantity == argsData.quantity) {
      
      } else {
      this.data.push(d);  
  }
})
  }

  onCategoryChange(args: any) {
    this.selectedCategory = args.itemData;
    console.log('change happp.......', this.selectedCategory);
  }
}

