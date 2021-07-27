import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import("./pages/login/login.module").then(m => m.LoginModule)
  },{
    path: 'main',
    canActivate: [AuthGuard],
    loadChildren: () => import("./pages/main/main.module").then(m => m.MainModule)
  },{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
