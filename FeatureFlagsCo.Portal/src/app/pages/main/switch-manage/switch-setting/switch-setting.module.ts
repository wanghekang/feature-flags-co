import { NgModule } from '@angular/core';

import { SwitchSettingRoutingModule } from './switch-setting-routing.module';
import { SwitchSettingComponent } from './switch-setting.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentsModule } from '../components/components.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [
    SwitchSettingComponent,
    
  ],
  imports: [
    NzButtonModule,
    NzInputModule,
    NzMessageModule,
    FormsModule,
    ComponentsModule,
    SwitchSettingRoutingModule
  ]
})
export class SwitchSettingModule { }
