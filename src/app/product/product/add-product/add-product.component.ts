import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandModel, GridComponent, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category.interface';
import { Product } from 'src/app/model/product.interface';
import { CategoryListComponent } from '../../category/category-list/category-list.component';
import { ProductService } from '../../product.service';
import { pluck } from 'rxjs/operators';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product$: Observable<Product> = this.route.data.pipe(pluck('product'));
  public mode!:string;
  public title!:string;
  public productId!:any;
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
  constructor(private router:Router,private productService:ProductService ,private route:ActivatedRoute) { }

private initializeValues(){
  
  this.product$.subscribe(p=>{
    if(p){
      this.form.patchValue(p);
      this.selectedCategory = p.category;
      this.productId = p.id;
      this.mode="update";
      this.title =  "Edit Product";

    }else{
      this.mode =  "add";
      this.title = "Add new products";
    }
  })
}

  ngOnInit(): void {
    this.pageSettings = { pageSize: 6 };
    this.initializeValues();
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
    if(this.mode == "add"){
      const products = this.data;
      this.productService.addProducts(products).subscribe(errorRes => {
        if (errorRes == '') {
          this.router.navigate(['/ws/product']);
        }
        else {
          console.log('error is:',errorRes);
        } 
      });
    }else{
      const productData: Product = this.form.value;
      productData.category = this.selectedCategory;
      this.productService.editProduct(productData, this.productId).then(res => {
        this.router.navigate(['/ws/product'])
      });
  
    }
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
  }
}

