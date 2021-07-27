import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/services/auth.service';
import { getAuth } from 'src/app/utils';
import { repeatPasswordValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  validateForm!: FormGroup;

  auth = getAuth();

  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.validateForm = new FormGroup({
      email: new FormControl({ value: this.auth.email, disabled: true }, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      _password: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(this.auth.phoneNumber, [Validators.required]),
    }, {
      validators: repeatPasswordValidator
    });
  }

  submitForm() {
    if (this.validateForm.invalid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    const { _password, ...params } = this.validateForm.value;

    this.isLoading = true;
    this.authService.updateSelfInfo({ ...params, email: this.auth.email })
      .pipe()
      .subscribe(
        res => {
          this.isLoading = false;
          this.message.success('更新信息成功，请重新登录！');
          this.authService.logout();
        },
        err => {
          this.isLoading = false;
        }
      );
  }

}
