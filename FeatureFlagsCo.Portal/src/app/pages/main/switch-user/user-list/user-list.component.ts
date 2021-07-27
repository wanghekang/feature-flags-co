import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';;
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { AccountService } from 'src/app/services/account.service';
import { IAccount, IProjectEnv } from 'src/app/config/types';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit, OnDestroy {

  destory$: Subject<void> = new Subject();

  currentEnvId: number;
  currentAccountId: number;

  list = [];
  totalCount: number;

  pageSize: number = 10;
  pageIndex: number = 0;

  searchValue: string = '';

  isLoading: boolean = false;
  visible: boolean = false;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private accountService: AccountService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initEnvId();

    this.projectService.currentProjectEnvChanged$
      .pipe(
        debounceTime(200),
        takeUntil(this.destory$)
      )
      .subscribe(
        res => {
          this.initEnvId();
        }
      );

  }

  private initEnvId() {
    this.accountService.getCurrentAccount().subscribe((account: IAccount) => {
      if (!!account) {
        this.currentAccountId = account.id;
        this.projectService.getCurrentProjectAndEnv(this.currentAccountId).subscribe((projectEnv: IProjectEnv) => {
          this.currentEnvId = projectEnv.envId;
          this.fetchUserList();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  // initFFC(): void {

  // }

  fetchUserList() {
    this.isLoading = true;
    this.userService.getEnvUsers({ pageIndex: this.pageIndex, pageSize: this.pageSize, environmentId: this.currentEnvId, searchText: this.searchValue })
      .pipe()
      .subscribe(
        res => {
          this.isLoading = false;
          this.list = res.users;
          this.totalCount = res.count;
        },
        err => {
          this.isLoading = false;
        }
      );
  }

  onSearchClick() {
    this.fetchUserList();
  }

  onQueryChange(params: NzTableQueryParams) {
    if (!this.currentEnvId) return;
    const { pageIndex, pageSize } = params;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex - 1;
    this.fetchUserList();
  }

  onRowClick(user) {
    this.router.navigateByUrl(`/main/switch-user/detail/${encodeURIComponent(user.id)}`)
  }

  onPropsSettingClick() {
    this.visible = true;
  }

  onClose() {
    this.visible = false;
  }
}
