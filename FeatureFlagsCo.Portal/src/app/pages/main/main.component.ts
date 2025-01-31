import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAuthProps, IAccount, IProject, IProjectEnv } from 'src/app/config/types';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { IMenuItem } from 'src/app/share/uis/menu/menu';
import { QUICK_COMBAT_DOCUMENT, INTEGRATION_OF_CLOUD_SERVICE_PROVIDERS, AGILE_SWITCH_BOLIERPLATE } from 'src/app/config';
import { AccountService } from 'src/app/services/account.service';
import { getAuth } from 'src/app/utils';
import { ProjectService } from 'src/app/services/project.service';
import { SwitchService } from 'src/app/services/switch.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit, OnDestroy {

  public menus: IMenuItem[] = [];
  public auth: IAuthProps
  public currentAccount: IAccount;

  private destory$: Subject<void> = new Subject();

  get accounts() {
    return this.accountService.accounts || [];
  }

  get projects() {
    return this.projectService.projects || [];
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private accountService: AccountService,
    private projectService: ProjectService,
    private switchService: SwitchService,
    private userService: UserService
  ) {
    this.setMenus();
    this.fetchList();
  }

  ngOnInit(): void {
    this.auth = getAuth();
    this.accountService.accountHasChanged$
      .pipe(
        takeUntil(this.destory$)
      )
      .subscribe(
        res => {
          this.accountService.getCurrentAccount().subscribe((account: IAccount) => {
            this.currentAccount = account;
            this.projectService.getCurrentProjectAndEnv(this.currentAccount.id).subscribe();
          })
        }
      );
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  private setMenus(): void {
    // 菜单 path 和 target 互斥，优先匹配 path

    this.menus = [
      {
        level: 1,
        title: '开关管理',
        path: '/main/switch-manage/index'
      }, {
        level: 1,
        title: '开关用户管理',
        path: '/main/switch-user'
      }, {
        level: 1,
        title: '开关存档',
        path: '/main/switch-archive'
      }, {
        level: 1,
        line: true
      }, {
        level: 1,
        title: '快速实战文档',
        target: QUICK_COMBAT_DOCUMENT
      }, {
        level: 1,
        title: 'SDK & Integration',
        target: INTEGRATION_OF_CLOUD_SERVICE_PROVIDERS
      }, {
        level: 1,
        title: '特征管理指南',
        target: AGILE_SWITCH_BOLIERPLATE
      }, {
        level: 1,
        line: true
      }, {
      //   level: 1,
      //   title: 'Project 管理',
      //   path: '/main/account-manage'
      // }, {
        level: 1,
        title: '账户管理',
        path: '/main/account-settings'
      }
    ];
  }

  // 获取 account 列表
  public fetchList() {
    this.accountService.getAccountList();
  }

  // 跳转路由
  public onRouteTo(value: { type: 'menu' | 'link', url: string }) {
    if (value.type === 'menu') {
      this.router.navigateByUrl(value.url);
    } else if (value.type === 'link') {
      // console.log(value.url);
    }
  }

  public logout() {
    this.authService.logout();
  }

  onRouteLabel = (label: string) => {
    if (label === '开关详情') {
      return this.switchService.currentSwitch.name;
    }
    if (label === '用户详情') {
      return this.userService.currentUser ? this.userService.currentUser.name : label;
    }
    return label;
  }
}
