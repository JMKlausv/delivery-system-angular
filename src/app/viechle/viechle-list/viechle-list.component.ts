import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Viechle } from 'src/app/model/viechle.interface';
import { ViechleService } from '../viechle.service';

@Component({
  selector: 'app-viechle-list',
  templateUrl: './viechle-list.component.html',
  styleUrls: ['./viechle-list.component.css']
})
export class ViechleListComponent implements OnInit {
  viechles: Viechle[] = [];
  public data: Viechle[]=[];
  columnData: { field: string, headerText: string }[] = [
    { field: 'model', headerText: 'Model' },
    { field: 'type', headerText: 'Type' },
    { field: 'licenceNumber', headerText: 'Licence plate' },
  ];
  constructor(private viechleService:ViechleService , private router:Router) { }

  ngOnInit(): void {
    this.viechleService.fetchViechles().subscribe(res => {
      this.viechles = res;
    })
  }
  viewViechle(rowData: any) {
  
   this.router.navigate(['/ws/viechle/new'],{queryParams:{id:rowData.id}})
  }
  deleteViechle(rowData: any) {
    if (window.confirm('are you sure')) {
      this.viechleService.deleteViechle(rowData.id).then(res => {
        this.ngOnInit();
      })
    }
  }
 
}
