import { Component, OnInit } from '@angular/core';
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
  constructor(private viechleService:ViechleService , private router:Router) { }

  ngOnInit(): void {
    this.viechleService.fetchViechles().subscribe(res => {
      this.viechles = res;
    })
    
  }
  viewViechle(id:string) {
    this.router.navigate(['viechle',id])
  }

}
