import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwitchSettingComponent } from './switch-setting.component';

const routes: Routes = [
  {
    path: '',
    component: SwitchSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwitchSettingRoutingModule { }
