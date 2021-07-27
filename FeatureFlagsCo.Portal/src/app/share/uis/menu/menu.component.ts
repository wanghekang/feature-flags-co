import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IAuthProps, IAccount, IProject, IEnvironment, IProjectEnv } from 'src/app/config/types';
import { IMenuItem } from './menu';
import { getAuth } from 'src/app/utils';
import { AccountService } from 'src/app/services/account.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {


  @Input() menus: IMenuItem[];
  @Output() logout = new EventEmitter();

  get projects() {
    return this.projectService.projects || [];
  }

  selectedProject: IProject;
  selectedEnv: IEnvironment;
  auth: IAuthProps;
  currentProjectEnv: IProjectEnv;
  currentAccount: IAccount;
  envModalVisible: boolean = false;

  constructor(
    private accountService: AccountService,
    private projectService: ProjectService,
  ) {
  }

  ngOnInit(): void {
    this.auth = getAuth();
    this.projectService.currentProjectEnvChanged$
      .pipe()
      .subscribe(
        res => {
          this.accountService.getCurrentAccount().subscribe((account: IAccount) => {
            if (!!account) {
              this.currentAccount = account;
              this.projectService.getCurrentProjectAndEnv(this.currentAccount.id).subscribe((projectEnv: IProjectEnv) => {
                this.currentProjectEnv = projectEnv;
                this.setSelectedProjectAndEnv(this.currentProjectEnv);
              });
            }
          })
        }
      );

    this.accountService.getCurrentAccount().subscribe((account: IAccount) => {
      if (!!account) {
        this.currentAccount = account;
        this.projectService.getCurrentProjectAndEnv(this.currentAccount.id).subscribe((projectEnv: IProjectEnv) => {
          this.currentProjectEnv = projectEnv;
          this.setSelectedProjectAndEnv(this.currentProjectEnv);
        });
      }
    })

    this.accountService.accountHasChanged$
      .pipe()
      .subscribe(
        res => {
          this.accountService.getCurrentAccount().subscribe((account: IAccount) => {
            if (!!account) {
              this.currentAccount = account;
              this.projectService.getCurrentProjectAndEnv(this.currentAccount.id).subscribe((projectEnv: IProjectEnv) => {
                this.currentProjectEnv = projectEnv;
                this.setSelectedProjectAndEnv(this.currentProjectEnv);
              });
            }
          })
        }
      );
  }

  private setSelectedProjectAndEnv(projectEnv: IProjectEnv) {
    this.selectedProject = { id: this.currentProjectEnv.projectId, name: this.currentProjectEnv.projectName } as IProject;
    this.selectedEnv = { id: this.currentProjectEnv.envId, name: this.currentProjectEnv.envName } as IEnvironment;
  }

  get availableProjects() {
    return this.projects;
  }

  get availableEnvs() {
    return this.projects.find(x => x.id === this.selectedProject.id)?.environments;
  }

  envModelCancel() {
    this.envModalVisible = false;
  }

  envModalConfirm() {
    const projectEnv = {
      projectId: this.selectedProject.id,
      projectName: this.selectedProject.name,
      envId: this.selectedEnv.id,
      envName: this.selectedEnv.name,
    };

    this.projectService.changeCurrentProjectAndEnv(projectEnv);
    this.currentProjectEnv = projectEnv;
    this.envModalVisible = false;
    window.location.reload();
  }

  onSelectProject(project: IProject) {
    this.selectedProject = project;
  }

  onSelectEnv(env: IEnvironment) {
    this.selectedEnv = env;
  }

  onMenuItemSelected(menu: IMenuItem) {
    if (menu.path) return;
    window.open(menu.target);
  }
}
