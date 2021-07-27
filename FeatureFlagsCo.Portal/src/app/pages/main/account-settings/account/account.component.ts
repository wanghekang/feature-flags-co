import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { getAuth } from 'src/app/utils';
import { IAccount } from 'src/app/config/types';
import { AccountService } from 'src/app/services/account.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {

  validateOrgForm!: FormGroup;

  auth = getAuth();
  currentAccount: IAccount;
  allAccounts: IAccount[];

  isLoading: boolean = false;

  constructor(
    private accountService: AccountService,
    private projectService: ProjectService,
    private message: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.initOrgForm();
  }

  initOrgForm() {
    const orgNameCtrl = new FormControl('', [Validators.required])
    this.accountService.getCurrentAccount().subscribe(
      (account: IAccount) => {
        if (!!account) {
          this.currentAccount = account;
          this.allAccounts = this.accountService.accounts;
          orgNameCtrl.setValue(this.currentAccount.organizationName);
        }
      }
    );

    this.validateOrgForm = new FormGroup({
      organizationName: orgNameCtrl,
    });

    // register to account change
    console.log('initorgform');
    this.accountService.accountHasChanged$
      .pipe()
      .subscribe(
        res => {
          this.accountService.getCurrentAccount().subscribe((account: IAccount) => {
            if (!!account) {
              this.currentAccount = account;
              this.allAccounts = this.accountService.accounts;
              orgNameCtrl.setValue(this.currentAccount.organizationName);
            }
          })
        }
      );
  }

  onAccountChange() {
    this.accountService.changeAccount(this.currentAccount);
    window.location.reload();
    //this.projectService.resetCurrentProjectAndEnv(this.currentAccount.id);
  }

  submitOrgForm() {
    if (this.validateOrgForm.invalid) {
      for (const i in this.validateOrgForm.controls) {
        this.validateOrgForm.controls[i].markAsDirty();
        this.validateOrgForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    const { organizationName } = this.validateOrgForm.value;
    const { id } = this.currentAccount;

    this.isLoading = true;
    this.accountService.putUpdateAccount({ organizationName, id })
      .pipe()
      .subscribe(
        res => {
          this.accountService.changeAccount({ id, organizationName });
          this.accountService.getCurrentAccount().subscribe((account: IAccount) => {
            this.currentAccount = account
            this.allAccounts = this.accountService.accounts;
          });
          this.isLoading = false;
          this.message.success('更新信息成功！');
        },
        err => {
          this.isLoading = false;
        }
      );
  }

}
