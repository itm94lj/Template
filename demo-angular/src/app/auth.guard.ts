import {CanActivateFn, Router} from '@angular/router';
import {Injectable, inject} from "@angular/core";
import {OAuthService} from "angular-oauth2-oidc";

export const authGuard: CanActivateFn = (route, state) => {
  const oauth2 = inject(OAuthService);
  const router = inject(Router);
  console.log('authGuard invoked.');
  if (oauth2.hasValidAccessToken() &&
      oauth2.hasValidIdToken()) {
    console.log('auth pass.');
    return true;
  } else {
    console.log('auth no pass, redirect to /signin');
    router.navigate(['/signin', {login: true}]);
    return false;
  }
};
