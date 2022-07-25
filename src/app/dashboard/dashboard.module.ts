import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
//import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
// import {SidebarModule } from 'cdbangular';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
// import { SidebarModule } from 'ng-cdbangular';
import { ChartComponent } from './chart/chart.component';
import { ChartModule} from '@syncfusion/ej2-angular-charts';
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, LegendService, TooltipService, DataLabelService, LineSeriesService} from '@syncfusion/ej2-angular-charts';
import { PiechartComponent } from './piechart/piechart.component';
import { PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationAnnotationService,
  AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
]

@NgModule({
  declarations: [DashboardComponent, ChartComponent, PiechartComponent],
  imports: [
    CommonModule,
    DashboardLayoutModule,
    ChartModule,
  //  SidebarModule,
   AccumulationChartModule,
    // CDBFreeModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    CategoryService, LegendService, TooltipService, DataLabelService, LineSeriesService,
    PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService,
     AccumulationAnnotationService
  ]
})
export class DashboardModule { }
