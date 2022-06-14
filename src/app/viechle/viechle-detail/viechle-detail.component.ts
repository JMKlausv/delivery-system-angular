import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Viechle } from 'src/app/model/viechle.interface';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ViechleService } from '../viechle.service';

@Component({
  selector: 'app-viechle-detail',
  templateUrl: './viechle-detail.component.html',
  styleUrls: ['./viechle-detail.component.css']
})
export class ViechleDetailComponent implements OnInit {

  viechle$: Observable<Viechle> = this.route.data.pipe(pluck('viechle'));
  viechle!: Viechle;
  id!: string;
  form = new FormGroup({
    model: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    licenceNum: new FormControl('',[Validators.required]),
  })
  get model():FormControl {
    return (this.form.get('model') as FormControl) ;
  }
  get type():FormControl {
    return (this.form.get('type') as FormControl) ;
  }
  get licenceNum():FormControl {
    return (this.form.get('licenceNum') as FormControl) ;
  }
 
  constructor(private route: ActivatedRoute, private router: Router , private viechleService:ViechleService) {
   }

  ngOnInit(): void {
    this.viechle$.subscribe(v => {
      this.viechle = v;
      // this.model.setValue(v.model);
      // this.type.setValue(v.type);
      // this.licenceNum.setValue(v.licenceNum);
      this.form.patchValue(v);
    });
    this.route.params.subscribe(params => {
      this.id = params.id;
    })
  
  }
  cancel() { 
    this.router.navigate(['/ws/viechle']);
  }
  editViechle() {
    const viechleData: Viechle = this.form.value;
    this.viechleService.editViechle(viechleData, this.id).then(res => {
      this.router.navigate(['/ws/viechle'])
    });

  }
}
