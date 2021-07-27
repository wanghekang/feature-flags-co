import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.less']
})
export class UserDetailComponent implements OnInit {

  userId: string;

  user;

  defaultKeys = ['keyId', 'name', 'email'];

  get list() {
    if (!this.user) return [];
    if (!this.user.customizedProperties) {
      return this.defaultKeys.map(key => ({
        name: key,
        value: this.user[key]
      }));
    }
    return this.user.customizedProperties.concat(
      this.defaultKeys.map(key => ({
        name: key,
        value: this.user[key]
      }))
    );
  }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.listenerResolveData();
    // this.userId = this.route.snapshot.paramMap.get('id');
    // this.fetchUserDetail();
  }

  // fetchUserDetail() {
  //   this.userService.getEnvUserDetail({ id: this.userId })
  //     .pipe()
  //     .subscribe(
  //       res => {
  //         this.user = res;
  //       }
  //     );
  // }

  listenerResolveData() {
    this.route.data
      .pipe(
        map(res => res.userDetail)
      )
      .subscribe(res => {
        this.user = res;
      });
  }
}
