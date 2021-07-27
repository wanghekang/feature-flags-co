import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TargetConditionsComponent } from './target-conditions.component';

const routes: Routes = [
  {
    path: '',
    component: TargetConditionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetConditionsRoutingModule { }
