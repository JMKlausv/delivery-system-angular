import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommandModel, GridComponent, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Viechle } from 'src/app/model/viechle.interface';
import { ViechleService } from '../viechle.service';

@Component({
  selector: 'app-add-viechle',
  templateUrl: './add-viechle.component.html',
  styleUrls: ['./add-viechle.component.css']
})
export class AddViechleComponent implements OnInit {
  public data: Viechle[] = [];
  public pageSettings!: PageSettingsModel;
  public commands!: CommandModel[];
  @ViewChild('grid') public grid!: GridComponent;
  form = new FormGroup({
    model: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    licenceNum: new FormControl('',[Validators.required]),
    viechles: new FormArray([
     
    ])
  })
  get viechleArray():FormArray {
    return (this.form.get('viechles') as FormArray )  ;
  }
  get model():FormControl {
    return (this.form.get('model') as FormControl) ;
  }
  get type():FormControl {
    return (this.form.get('type') as FormControl) ;
  }
  get licenceNum():FormControl {
    return (this.form.get('licenceNum') as FormControl) ;
  }
  constructor(private router:Router,private viechleService:ViechleService ) { }

  ngOnInit(): void {
    this.pageSettings = { pageSize: 6 };
    this.commands = [
    { buttonOption: { content: 'x', cssClass: '' } }
    ];
  }
  removeViechle(index:number) {
    this.viechleArray.removeAt(index);
  }
  addViechle() {
    const model = this.model.value;
    const type = this.type.value;
    const licenceNum = this.licenceNum.value;
    if (model && type && licenceNum) {
      
      const newViechleGroup = new FormGroup({
        model: new FormControl({ value: model, disabled: true },),
        type: new FormControl({ value: type, disabled: true }),
        licenceNum: new FormControl({ value: licenceNum, disabled: true }),
      });
      this.viechleArray.clear();
      this.viechleArray.push(newViechleGroup)
      this.data.push(newViechleGroup.value)


    }

  }
  addViechlesToDb() {
    const viechles = this.data as Viechle[];
    console.log(this.data);
    this.viechleService.addViechles(viechles).subscribe(errorRes => {
      if (errorRes == '') {
       
         this.router.navigate(['/ws/viechle']);
      }
      else {
        console.log('error is:', errorRes);
        
      }
    });
  }
  cancel() {
    this.router.navigate(['/ws/viechle']);
  }

  commandClick(args: any) {
    const argsData = args.rowData;
    const oldData = this.data;
    this.data = [];
    oldData.forEach(d => {
      if (d.licenceNum == argsData.licenceNum && d.model == argsData.model && d.type == argsData.type) {
      
      } else {
      this.data.push(d);  
  }
})
  }
}
