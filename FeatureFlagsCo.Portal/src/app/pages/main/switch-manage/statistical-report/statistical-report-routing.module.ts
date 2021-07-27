import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticalReportComponent } from './statistical-report.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticalReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticalReportRoutingModule { }
