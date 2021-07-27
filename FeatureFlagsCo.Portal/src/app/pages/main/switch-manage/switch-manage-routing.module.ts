import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticalReportResolver } from './statistical-report/statistical-report-resolver.service';
import { SwitchManageComponent } from './switch-manage.component';
import { SwicthSettingResolver } from './switch-setting/swicth-setting-resolver.service';
import { TargetConditionsResolver } from './target-conditions/target-conditions-resolver.service';

const routes: Routes = [
  {
    path: 'index',
    data: {
      breadcrumb: '开关管理'
    },
    component: SwitchManageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("./switch-index/switch-index.module").then(m => m.SwitchIndexModule)
      }, {
        path: 'setting/:id',
        resolve: { switchInfo: SwicthSettingResolver },
        loadChildren: () => import("./switch-setting/switch-setting.module").then(m => m.SwitchSettingModule),
        data: {
          breadcrumb: '开关详情'
        }
      }, {
        path: 'report/:id',
        resolve: { switchInfo: StatisticalReportResolver },
        loadChildren: () => import("./statistical-report/statistical-report.module").then(m => m.StatisticalReportModule),
        data: {
          breadcrumb: '开关详情'
        }
      }, {
        path: 'condition/:id',
        resolve: { switchInfo: TargetConditionsResolver },
        loadChildren: () => import("./target-conditions/target-conditions.module").then(m => m.TargetConditionsModule),
        data: {
          breadcrumb: '开关详情'
        }
      }, {
        path: '',
        redirectTo: '/main/switch-manage/index'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    SwicthSettingResolver,
    TargetConditionsResolver,
    StatisticalReportResolver
  ]
})
export class SwitchManageRoutingModule { }