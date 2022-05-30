import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Viechle } from 'src/app/model/viechle.interface';
import { ViechleService } from '../viechle.service';

@Component({
  selector: 'app-add-viechle',
  templateUrl: './add-viechle.component.html',
  styleUrls: ['./add-viechle.component.css']
})
export class AddViechleComponent implements OnInit {
  form = new FormGroup({
    model: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    licenceNum: new FormControl('',[Validators.required]),
    viechles: new FormArray([
      new FormGroup({
        model: new FormControl({value: 'model123', disabled:true},),
        type: new FormControl({value: 'type1', disabled:true}),
        licenceNum: new FormControl({value: 'ldkjfa2847835', disabled:true}),
      })
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
      this.viechleArray.push(newViechleGroup);


    }

  }
  addViechlesToDb() {
    const viechles = this.viechleArray.value as Viechle[];
    this.viechleService.addViechles(viechles).subscribe(errorRes => {
      if (errorRes == '') {
        this.router.navigate(['/viechle']);
      }
      else {
        console.log('error is:',errorRes);
      }
    
      
    });
  }
  cancel() {
    this.router.navigate(['/viechle']);
  }

}
