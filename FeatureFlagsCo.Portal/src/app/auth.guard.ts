import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { AccountService } from './services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private accountService: AccountService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkLogin(state.url);
  }

  checkLogin(url: string): true | UrlTree {
    const token = localStorage.getItem('token');

    if (token) {
      this.accountService.afterLoginSelectAccount();
      return true;
    }

    this.authService.redirectUrl = url;

    return this.router.parseUrl('/login');
  }

}
