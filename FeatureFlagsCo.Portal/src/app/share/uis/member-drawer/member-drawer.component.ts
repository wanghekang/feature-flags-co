import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-member-drawer',
  templateUrl: './member-drawer.component.html',
  styleUrls: ['./member-drawer.component.less']
})
export class MemberDrawerComponent implements OnInit {

  memberForm: FormGroup;

  isEditing: boolean = false;

  isLoading: boolean = false;

  memberRoles: string[] = ['Admin'];

  @Input() currentAccountId: number;
  @Input() visible: boolean = false;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.memberForm = this.fb.group({
      email: [null, [Validators.required]],
      role: [null, [Validators.required]],
    });
  }

  resetForm() {
    this.memberForm && this.memberForm.reset();
  }

  onClose() {
    this.close.emit();
  }

  doSubmit() {
    if (this.memberForm.invalid) {
      for (const i in this.memberForm.controls) {
        this.memberForm.controls[i].markAsDirty();
        this.memberForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    this.isLoading = true;

    const { email, role } = this.memberForm.value;

    this.teamService.postAddMemberToAccount(this.currentAccountId, { email, role })
    .pipe()
    .subscribe(
      () => {
        this.isLoading = false;
        this.close.emit(true);
        this.message.success('添加成员成功！');
      },
      err => {
        this.isLoading = false;
      }
    )
  }
}
