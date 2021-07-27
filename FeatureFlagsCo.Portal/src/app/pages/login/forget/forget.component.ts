import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.less', '../login.component.less']
})
export class ForgetComponent implements OnInit, OnDestroy {

  forgetForm!: FormGroup;

  isLoading: boolean = false;

  timer;

  seconds: number = 60;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    window.clearInterval(this.timer);
  }

  initForm() {
    this.forgetForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  doFind() {
    if (this.forgetForm.invalid) {
      for (const i in this.forgetForm.controls) {
        this.forgetForm.controls[i].markAsDirty();
        this.forgetForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    this.isLoading = true;
    const { _password, ...params } = this.forgetForm.value
    this.loginService.forgetPassword(params)
      .subscribe(
        res => {
          this.message.success('邮件已发送至该邮箱，请注意查收！');
          this.timer = window.setInterval(() => {
            this.seconds--;
            if (!this.seconds) {
              window.clearInterval(this.timer);
              this.seconds = 60;
              this.isLoading = false;
            }
          }, 1000)
        },
        err => {
          this.isLoading = false;
          this.message.error('该邮箱尚未注册！');
        }
      )
  }

  changeRoute(url) {
    this.router.navigateByUrl(url);
  }

}
