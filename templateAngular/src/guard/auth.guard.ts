import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AppService} from "../app/app.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private app: AppService,
              private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string  = state.url;
    console.log('AuthGuard invoked. url:[' + url + ']');
    return this.checkLogin(url);
  }

  checkLogin(url: string): true|UrlTree {
    if (this.app.authenticated) {
      return true;
    }

    this.app.redirectUrl = url;

    return this.router.parseUrl('/signin');
  }

}
