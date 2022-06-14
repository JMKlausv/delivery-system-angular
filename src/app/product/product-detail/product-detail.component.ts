import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Category } from 'src/app/model/category.interface';
import { Product } from 'src/app/model/product.interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product> = this.route.data.pipe(pluck('product'));
  product!: Product;
  id!: string;
  public cFields: Object = { text: 'name', value: 'id' };
  selectedCategory!: Category;
  form = new FormGroup({
    name: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('',[Validators.required]),
  })
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

  constructor(private route: ActivatedRoute, private router: Router , private productService:ProductService) {
   }

  ngOnInit(): void {
    this.product$.subscribe(v => {
      this.product = v;
      this.form.patchValue(v);
      
    });
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.productService.fetchCategories().subscribe(res => {
      this.categoryList = res;
    });
  }
  cancel() { 
    this.router.navigate(['/ws/product']);
  }
  editProduct() {
    
    const productData: Product = this.form.value;
    productData.category = this.selectedCategory;
    this.productService.editProduct(productData, this.id).then(res => {
      this.router.navigate(['/ws/product'])
    });

  }
  onCategoryChange(args: any) {
    this.selectedCategory = args.itemData;
    console.log('change happp.......', this.selectedCategory);
  }
}
