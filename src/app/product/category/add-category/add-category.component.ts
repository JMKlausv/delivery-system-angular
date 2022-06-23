import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category.interface';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  public category$ = this.router.getCurrentNavigation()?.extras.state ;
  public mode!:string;
  public title!:string;
  form = new FormGroup({
    name: new FormControl('',[Validators.required]),
    categories: new FormArray([
    ])
  })
  get categoryArray():FormArray {
    return (this.form.get('categories') as FormArray )  ;
  }
  get name():FormControl {
    return (this.form.get('name') as FormControl) ;
  }
  constructor(private router:Router,private productService:ProductService ) { }

  ngOnInit(): void {
  if(this.category$){
    this.mode = "update";
    this.title = "Update Category";
    this.form.patchValue(this.category$)
  }else{
    this.mode =  "add";
    this.title = "Add New Category";
  }
  }
  removeCategory(index:number) {
    this.categoryArray.removeAt(index);
  }
  addCategory() {
    const name = this.name.value;
    if (name) {
      const newCategoryGroup = new FormGroup({
        name: new FormControl({ value: name, disabled: true },),
      });
      this.categoryArray.push(newCategoryGroup);
    }

  }
  addCategoryToDb() {
    const categories = this.categoryArray.value ;
    this.productService.addCategories(categories).subscribe(errorRes => {
      if (errorRes == '') {
        this.router.navigate(['ws/product/categories']) ;
      ;
      }
      else {
        console.log('error is:',errorRes);
      }
      
    });
  }
  cancel() {
    this.router.navigate(['ws/product/categories']);
  }

  
}


