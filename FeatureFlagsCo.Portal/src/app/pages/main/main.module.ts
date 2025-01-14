import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ShareModule } from 'src/app/share/share.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@NgModule({
  declarations: [MainComponent],
  imports: [
    ShareModule,
    NzBreadCrumbModule,
    MainRoutingModule
  ]
})
export class MainModule { }
