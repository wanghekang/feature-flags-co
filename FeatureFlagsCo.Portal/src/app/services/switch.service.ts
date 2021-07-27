import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { btnsConfig } from '../pages/main/switch-manage/components/nav-btns/btns';
import { CSwitchParams, IFfParams } from '../pages/main/switch-manage/types/switch-new';
import { ProjectService } from './project.service';
import { AccountService } from './account.service';
import { IAccount, IProjectEnv } from '../config/types';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  public isFirstInto: boolean = true;
  public accountId: number = null;
  public projectId: number = null;
  public envId: number = null;
  public navConfig: any = [];
  public currentSwitchList: IFfParams[] = [];
  public currentSwitch: IFfParams = null;

  constructor(
    private http: HttpClient,
    private projectService: ProjectService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.initEnvIds();
  }

  // 监听工作区间 ID
  public listenerEnvID(sub: Subject<any>) {
    this.projectService.currentProjectEnvChanged$
      .pipe(
        takeUntil(sub),
        debounceTime(200),
      )
      .subscribe(
        res => {
          this.initEnvIds();
        }
      );
  }

  private initEnvIds() {
    this.accountService.getCurrentAccount().subscribe((account: IAccount) => {
      if (!!account) {
        this.accountId = account.id;
        this.projectService.getCurrentProjectAndEnv(account.id).subscribe((projectEnv: IProjectEnv) => {
          this.projectId = projectEnv.projectId;
          const envId = projectEnv.envId;
          if (this.envId && envId !== this.envId) {
            this.router.navigateByUrl("/main/switch-manage/index");
          }
          this.envId = envId;
        });
      }
    });
  }

  public setNavConfig(index: number) {
    let temp = this.navConfig[index];
    this.navConfig[index] = this.navConfig[0];
    this.navConfig[0] = temp;
  }

  public resetNav() {
    this.navConfig = [...btnsConfig];
  }

  public getCurrentSwitch() {
    return this.currentSwitch;
  }

  public setCurrentSwitch(data: IFfParams) {
    this.currentSwitch = data;
  }

  // 获取开关列表
  public getSwitchList(id: number): Observable<any> {
    const url = environment.url + `/FeatureFlags/GetEnvironmentFeatureFlags/${id}`;
    return this.http.get(url);
  }

  // 快速创建新的开关
  public createNewSwitch(name: string = 'demo1') {
    console.log('createNewSwitch');
    const url = environment.url + '/FeatureFlags/CreateFeatureFlag';
    return this.http.post(url, {
      "name": name,
      "environmentId": this.envId,
      "status": 'Enabled'
    })
  }

  // 切换开关状态
  public changeSwitchStatus(id: string, status: 'Enabled' | 'Disabled'): Observable<any> {
    const url = environment.url + '/FeatureFlags/SwitchFeatureFlag';
    return this.http.post(url, {
      "id": id,
      "environmentId": this.envId,
      "status": status
    })
  }

  // 更新开关名字
  public updateSwitchName(id: string, name: string): Observable<any> {
    const url = environment.url + '/FeatureFlags/UpdateFeatureFlagSetting';
    return this.http.put(url, {
      "id": id,
      "name": name
    })
  }

  // 获取开关详情
  public getSwitchDetail(id: string): Observable<any> {
    const url = environment.url + `/FeatureFlags/GetFeatureFlag`;
    return this.http.get(url, { params: { "id": id.toString() } });
  }

  // 获取规则配置
  public getEnvUserProperties(): Observable<any> {
    const url = environment.url + `/FeatureFlags/GetEnvironmentUserProperties/${this.envId}`;
    return this.http.get(url);
  }

  // 搜索用户
  public queryUsers(username: string = '', index: number = 0, size: number = 20): Observable<any> {
    const url = environment.url + `/FeatureFlagsUsers/QueryEnvironmentFeatureFlagUsers`;
    return this.http.get(url, {
      params: {
        "searchText": username.toString(),
        "environmentId": `${this.envId}`,
        "pageIndex": index.toString(),
        "pageSize": size.toString()
      }
    });
  }

  // 修改开关
  public updateSwitch(param: CSwitchParams): Observable<any> {
    let defaultRuleValue = param.getSwicthDetail().defaultRuleValue === 'null' ? null : param.getSwicthDetail().defaultRuleValue;
    const url = environment.url + `/FeatureFlags/UpdateFeatureFlag`;
    return this.http.put(url, { ...param, ff: { ...param.getSwicthDetail(), defaultRuleValue } });
  }

  // 存档开关
  public archiveEnvFeatureFlag(id: string, name: string): Observable<any> {
    const url = environment.url + `/FeatureFlags/ArchiveEnvironmentdFeatureFlag`;
    return this.http.post(url, {
      'featureFlagId': id,
      'featureFlgKeyName': name
    });
  }

  // 复位开关
  public unarchiveEnvFeatureFlag(id: string, name: string): Observable<any> {
    const url = environment.url + `/FeatureFlags/UnarchiveEnvironmentdFeatureFlag`;
    return this.http.post(url, {
      'featureFlagId': id,
      'featureFlgKeyName': name
    });
  }

  // 获取以存档的开关
  public getArchiveSwitch(id: number): Observable<any> {
    const url = environment.url + `/FeatureFlags/GetEnvironmentArchivedFeatureFlags/${id}`;
    return this.http.get(url);
  }

  public getReport(featureFlagId: string, chartQueryTimeSpan: string): Observable<any> {
    const url = environment.url + `/FeatureFlagUsage/GetFeatureFlagUsageData`;
    return this.http.get(url, {
      params: {
        featureFlagId,
        chartQueryTimeSpan
      }
    });
  }
}
