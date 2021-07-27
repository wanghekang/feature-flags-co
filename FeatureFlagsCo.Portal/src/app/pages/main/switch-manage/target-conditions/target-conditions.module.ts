import { NgModule } from '@angular/core';

import { TargetConditionsRoutingModule } from './target-conditions-routing.module';
import { TargetConditionsComponent } from './target-conditions.component';
import { ComponentsModule } from '../components/components.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@NgModule({
  declarations: [TargetConditionsComponent ],
  imports: [
    ComponentsModule,
    NzButtonModule,
    NzIconModule,
    NzMessageModule,
    NzSpinModule,
    TargetConditionsRoutingModule
  ]
})
export class TargetConditionsModule { }
