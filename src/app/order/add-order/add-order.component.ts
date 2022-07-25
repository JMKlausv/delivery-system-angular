import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommandModel, GridComponent, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Category } from 'src/app/model/category.interface';
import { Order } from 'src/app/model/order.interface';
import { Product } from 'src/app/model/product.interface';
import { Viechle } from 'src/app/model/viechle.interface';
import { ProductService } from 'src/app/product/product.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ViechleService } from 'src/app/viechle/viechle.service';
import { OrderService } from '../order.service';

const API = 'https://delivery-system-angular-default-rtdb.firebaseio.com/';
const API2:string = "https://localhost:7247/api/";
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  public mode!:string;
  public title!:string;
  public orderId!:any;
  public order!: Order;
  public viechleList: Viechle[] = [];
  public productList: Product[] = [];
  public categoryList: Category[] = [];
  public pageSettings!: PageSettingsModel;
  public commands!: CommandModel[];
  
  public selectedProducts: { product: Product, quantity: number }[] = [];
  public regionList: string[] = [
    'Amhara','Orormia','Harar','Somalie'
  ];
  public cityList:string[]=[
    'city1','city2','city3','city4'
  ]
// maps the appropriate column to fields property
  public vFields: Object = { text: 'model', value: 'id' };
  public pFields: Object = { text: 'name', value: 'id' };
  public cFields: Object = { text: 'name', value: 'id' };
  public categoryCountMap:Map<string,number>[] = [];
  @ViewChild('grid') public grid!: GridComponent;
  form = new FormGroup({
    region: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    specificAddress: new FormControl(''),
    customerEmail: new FormControl('',),
    phone:new FormControl(''),
    viechle: new FormControl('', [Validators.required]),
    orderDate: new FormControl('', [Validators.required]),
    deliveryDate: new FormControl('', [Validators.required]),
    category: new FormControl(''),
    product: new FormControl(''),
    quantity: new FormControl(''),
    products: new FormArray([
    ])
  })
  constructor(private router: Router, private orderService: OrderService, private productService: ProductService,private viechleService:ViechleService, private route:ActivatedRoute) { }
  order$: Observable<Order> = this.route.data?.pipe(pluck('order'));
  get productArray(): FormArray {
    return (this.form.get('products') as FormArray);
  }

  get region(): FormControl {
    return (this.form.get('region') as FormControl);
  }
  get city(): FormControl {
    return (this.form.get('city') as FormControl);
  }
  get specificAddress(): FormControl {
    return (this.form.get('specificAddress') as FormControl);
  }
  get customerEmail(): FormControl {
    return (this.form.get('customerEmail') as FormControl);
  }
  get phone(): FormControl {
    return (this.form.get('phone') as FormControl);
  }

  get viechle(): FormControl {
    return (this.form.get('viechle') as FormControl);
  }

  get orderDate(): FormControl {
    return (this.form.get('orderDate') as FormControl);
  }
  get deliveryDate(): FormControl {
    return (this.form.get('deliveryDate') as FormControl);
  }
  get category(): FormControl {
    return (this.form.get('category') as FormControl);
  }
  
  get product(): FormControl {
    return (this.form.get('product') as FormControl);
  }
  get quantity(): FormControl {
    return (this.form.get('quantity') as FormControl);
  }

  private fetchViechles() {
   return   this.viechleService.fetchViechles().subscribe(res=>{
      this.viechleList = res as Viechle[];
    });

  }
  private fetchProducts(categoryId:string ) {
    // return this.sharedService.fetchAll('https://delivery-system-angular-default-rtdb.firebaseio.com/products.json?orderBy="category/id"&equalTo="' + categoryId + '"').pipe(map(res => {
    //   this.productList= res as Product[];
    // }));
    return this.productService.fetchCategoryProducts(categoryId).subscribe(res=>{
      this.productList = res as Product[];
      console.log(this.productList);
    })
  }
  private fetchCategories() {
    // return this.sharedService.fetchAll('https://delivery-system-angular-default-rtdb.firebaseio.com/categories.json').pipe(map(res => {
    //   this.categoryList= res as Category[];
    // }));
    return this.productService.fetchCategories().subscribe(res=>{
      this.categoryList = res as Category[];
    })
  }

  private updateCategorycountMap(categoryId: string, cmd: string, quantity: number) {
    switch (cmd) {
      case 'add': 
      let map = new Map();
      let oldIndex = this.categoryCountMap.findIndex(val => val.get(categoryId));
        if (oldIndex != -1) {
          let newCount: any = this.categoryCountMap[oldIndex].get(categoryId);
          newCount += quantity;
          this.categoryCountMap[oldIndex].set(categoryId,newCount);
        } else {
          map.set(categoryId, quantity);
          this.categoryCountMap.push(map);
        }
        break;
      case 'remove':
        let index = this.categoryCountMap.findIndex(val => val.get(categoryId));
        if (index != -1) {
          let newCount: any = this.categoryCountMap[index].get(categoryId);
          newCount -= quantity;
          if (newCount == 0) {
            this.categoryCountMap = this.categoryCountMap.filter(val=>!val.has(categoryId))
          } else {
            this.categoryCountMap[index].set(categoryId, newCount);
          }
        }
        break;
    }
   
}
private initializeForm(o:Order){
    this.orderId = o.id;
    this.region.setValue(o.orderAddress.region);
    this.city.setValue(o.orderAddress.city);
    this.specificAddress.setValue(o.orderAddress.specificAddress);
    this.customerEmail.setValue(o.orderAddress.customerEmail);
    this.phone.setValue(o.orderAddress.phone);
    this.orderDate.setValue(o.orderDate);
    this.deliveryDate.setValue(o.deliveryDate);
    this.viechle.setValue(o.viechleId)
    o.products.forEach(p=>{
      this.selectedProducts.push(p)
    })
    const newProductGroup = new FormGroup({});
    this.productArray.push(newProductGroup);
  
 
}
  ngOnInit(): void {
    this.pageSettings = { pageSize: 6 };
    
    this.order$.subscribe(order=>{
      console.log('what is hapeening',order)
      if(order){

        this.mode="update";
        this.title ="Update Order";
       this.initializeForm(order);
      }else{
        this.mode='add';
        this.title="Add New Order";
      }
    })
   
    
    this.commands = [
      { buttonOption: { content: 'x', cssClass: '' } }
    ];
    this.fetchViechles();
    this.fetchCategories();
  }
  addProduct() {
    const productId = this.product.value;
    const quantity = this.quantity.value as number;
    const categoryId: string = this.category.value.toString();

    console.log("category count mappppp------------", this.categoryCountMap);
    if (productId && quantity) {
      this.updateCategorycountMap(categoryId, 'add', quantity);
      const productData = this.productList.find((p) => p.id == productId);
      let totalPrice=0;
      if (productData) {
         totalPrice =  productData.price * quantity
      }

      const newProductGroup = new FormGroup({
        product: new FormControl({ value: productData, disabled: true },),
        quantity: new FormControl({ value: quantity, disabled: true }),
        totalPrice: new FormControl({value:totalPrice, disabled:true})
      });
      this.productArray.clear();
      this.productArray.push(newProductGroup);
      this.selectedProducts.push(newProductGroup.value)
    }

  }
  addOrderToDb() {
    let selectedP: { product: Product,quantity: number }[] = [];
    let totalSum = 0
    this.selectedProducts.forEach(p => {
      if (p.product.id)
        selectedP.push({ product: p.product,quantity: p.quantity });
      totalSum +=( p.product.price * p.quantity);
    })
    this.order = {
      products: selectedP,
      viechleId: this.viechle.value,
      orderDate: this.orderDate.value,
      deliveryDate: this.deliveryDate.value,
      totalPrice: totalSum,
      orderAddress: {
        region: this.region.value,
        city: this.city.value,
        specificAddress: this.specificAddress.value,
        customerEmail: this.customerEmail.value,
        phone:this.phone.value,
      }
    };
    this.categoryCountMap.forEach(cm => {
      let key: string = Array.from(cm.keys())[0];
      let cat: Category;
      let count: any = cm.get(key);
      let catApi: string = API + 'categories/' + key + '.json';
      this.productService.fetchSingleCategory(key).then(res => {
        cat = res as Category;
        if (cat.orderCount) {
          count +=cat.orderCount;
        }
        this.productService.updateCategoryOrderCount(key,count as number).subscribe();
        // this.sharedService.patch({ "orderCount": count as number}, catApi).subscribe(res => {
        //   console.log('loop',res);
        // });
     })
   
    });
    if(this.mode == "add"){
      this.orderService.addOrder(this.order).then(res => {
      
        this.router.navigate(['/ws/order']);
      },
        error => {
        console.log(error);
      }
      )
    }else if(this.mode == "update"){
      this.orderService.editOrder(this.order,this.orderId).then(res => {
        this.router.navigate(['/ws/order']);
      },
        error => {
        console.log(error);
      });
    }
  

  }
  cancel() {
    this.router.navigate(['/ws/order']);
  }

  commandClick(args: any) {
    const argsData = args.rowData;
    const oldData = this.selectedProducts;
    this.selectedProducts = [];
    oldData.forEach((d: { product: Product; quantity: number; }) => {
      if (d.product == argsData.product && d.quantity == argsData.quantity) {
      
      } else {
        this.selectedProducts.push(d);
      }
    });
    this.updateCategorycountMap(argsData.product.category.id, 'remove', argsData.quantity);
  }

  onCategoryChange(args: any) {
    this.category.setValue(args.itemData.id)
    this.fetchProducts(args.itemData.id);

    console.log("xcvbnm,,,mnbvccvbnm,mnbvbnm,,,,,,,,,,,,,,,,,,,,,,",args.itemData.id);

  }



















}
