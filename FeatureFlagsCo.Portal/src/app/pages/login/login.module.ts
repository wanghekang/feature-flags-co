import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RegisterComponent } from './register/register.component';
import { ForgetComponent } from './forget/forget.component';
import { ResetComponent } from './reset/reset.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DoLoginComponent } from './do-login/do-login.component';
import { NzMessageModule } from 'ng-zorro-antd/message';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgetComponent, ResetComponent, DoLoginComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
